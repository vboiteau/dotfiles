#!/bin/bash

# get the path to this script
APP_PATH=`dirname "$0"`
APP_PATH=`( cd "$APP_PATH" && pwd )`

unattended=0
for param in "$@"
do
  echo $param
  if [ $param="--unattended" ]; then
    echo "installing in unattended mode"
    unattended=1
    subinstall_params="--unattended"
  fi
done

default=y
while true; do
  if [[ "$unattended" == "1" ]]
  then
    resp=$default
  else  
    [[ -t 0 ]] && { read -t 10 -n 2 -p $'\e[1;32mInstall i3? [y/n] (default: '"$default"$')\e[0m\n' resp || resp=$default ; }
  fi
  response=`echo $resp | sed -r 's/(.*)$/\1=/'`

  if [[ $response =~ ^(y|Y)=$ ]]
  then

    # install i3
    sudo apt -y install i3
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    # install dependencies for compilation of i3gaps
    sudo add-apt-repository -y ppa:aguignard/ppa
    sudo apt-get update

    sudo apt -y install libxcb1-dev libxcb-keysyms1-dev libpango1.0-dev libxcb-util0-dev libxcb-icccm4-dev libyajl-dev libstartup-notification0-dev libxcb-randr0-dev libev-dev libxcb-cursor-dev libxcb-xinerama0-dev libxcb-xkb-dev libxkbcommon-dev libxkbcommon-x11-dev autoconf help2man
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    # install graphical X11 graphical backend with lightdm loading screen
    sudo apt -y install lightdm xserver-xorg
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    # compile i3 dependency which is not present in the repo
    sudo apt -y install xutils-dev
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    cd /tmp
    git clone https://github.com/Airblader/xcb-util-xrm
    cd xcb-util-xrm
    git submodule update --init
    ./autogen.sh --prefix=/usr
    make
    sudo make install

    # install light for display backlight control
    # compile i3
    cd $APP_PATH/../../submodules/light/
    git checkout 1.1.2 # checkout the latest (at the time of writing) release
    make && sudo make install
    # set the minimal backlight value to 5%
    light -c -S 5

    # compile i3
    cd $APP_PATH/../../submodules/i3/
    autoreconf --force --install
    rm -rf build/
    mkdir -p build && cd build/

    # Disabling sanitizers is important for release versions!
    # The prefix and sysconfdir are, obviously, dependent on the distribution.
    ../configure --prefix=/usr --sysconfdir=/etc --disable-sanitizers
    make
    sudo make install

    # for brightness and volume control
    sudo apt -y install xbacklight alsa-utils pulseaudio feh arandr acpi
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    # for making gtk look better
    sudo apt -y install lxappearance 
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    # indicator-sound-switcher
    sudo apt -y install libappindicator3-dev
    cd $APP_PATH/../../submodules/indicator-sound-switcher
    sudo python3 setup.py install

    # symlink settings folder
    if [ ! -e ~/.i3 ]; then
      ln -sf $APP_PATH/doti3 ~/.i3
    fi

    # copy i3 config file
    cp $APP_PATH/doti3/config_git ~/.i3/config
    cp $APP_PATH/doti3/i3blocks.conf_git ~/.i3/i3blocks.conf
    cp $APP_PATH/i3blocks/wifi_git $APP_PATH/i3blocks/wifi
    cp $APP_PATH/i3blocks/battery_git $APP_PATH/i3blocks/battery

    # copy fonts
    # fontawesome 4.7 
    mkdir ~/.fonts
    cp $APP_PATH/fonts/* ~/.fonts/

    # link fonts.conf file
    mkdir ~/.config/fontconfig
    ln -sf $APP_PATH/fonts.conf ~/.config/fontconfig/fonts.conf         

    # install thunar
    sudo apt -y install thunar rofi compton i3blocks systemd
    if [ "$?" != "0" ]; then echo "Press Enter to continues.."; read; fi

    $APP_PATH/make_launchers.sh $APP_PATH/../../scripts

    # disable nautilus
    gsettings set org.gnome.desktop.background show-desktop-icons false

    # install xkblayout state
    bash $APP_PATH/../xkblayout-state/install.sh $subinstall_params

    # install prime-select (for switching gpus)
    sudo apt -y install nvidia-prime

    break
  elif [[ $response =~ ^(n|N)=$ ]]
  then
    break
  else
    echo " What? \"$resp\" is not a correct answer. Try y+Enter."
  fi

done
