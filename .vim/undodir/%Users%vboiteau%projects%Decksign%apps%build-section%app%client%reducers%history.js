Vim�UnDo� f���y6��r=9mX� *�^V��k��ѧj   p   F                        .delete({ path: `pages/${pageToRemove._id}` })   ,   )      &       &   &   &    Z��    _�                     G       ����                                                                                                                                                                                                                                                                                                                                                             Z��     �   F   G          -                                for: 'blank',5�_�                    E   9    ����                                                                                                                                                                                                                                                                                                                            E   >       E   9       v   9    Z��     �   D   F   q      A                            path: `decks/${next.deck._id}/pages`,5�_�      	             G        ����                                                                                                                                                                                                                                                                                                                            G   8       H   9       V   9    Z�     �   F   G          9                                width: pageToReadd.width,   :                                height: pageToReadd.height5�_�      
           	   G       ����                                                                                                                                                                                                                                                                                                                            G   8       G   9       V   9    Z�     �   F   H   p                                       �   F   H   o    5�_�   	              
   G   !    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�     �   F   I   p      "                                []5�_�   
                 H       ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�     �   G   I   q    5�_�                    H        ����                                                                                                                                                                                                                                                                                                                            J   8       J   9       V   9    Z�	     �   G   H           5�_�                    G   !    ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�     �   F   H   q      !                                [5�_�                    H        ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�     �   G   I   q      !                                ]5�_�                    H        ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�     �   G   I   q    5�_�                    H        ����                                                                                                                                                                                                                                                                                                                            J   8       J   9       V   9    Z�     �   G   H           5�_�                    G        ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�     �   F   H   q      "                                [{   "                                }]5�_�                    G   !    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�     �   F   H   p      %                                [{ }]5�_�                    G   "    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�     �   F   H   p      7                                [ next.deck.pages, { }]5�_�                    G   4    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�"     �   F   H   p      :                                [ ...next.deck.pages, { }]5�_�                    G   9    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�(     �   F   H   p      @                                [ ...next.deck.pages.map(), { }]5�_�                    G   M    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�.    �   F   H   p      O                                [ ...next.deck.pages.map(page => page.id), { }]5�_�                    G   "    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�9     �   F   I   p      N                                [ ...next.deck.pages.map(page => page.id), {}]5�_�                    H   I    ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�=     �   G   J   q      L                                ...next.deck.pages.map(page => page.id), {}]5�_�                    I   &    ����                                                                                                                                                                                                                                                                                                                            J   8       J   9       V   9    Z�@    �   H   K   r      '                                    {}]5�_�                   H   '    ����                                                                                                                                                                                                                                                                                                                            K   8       K   9       V   9    Z�l    �               s   !import api from '#Utilities/api';       "const getCopiedObject = value => (   >    value instanceof Object ? Object.assign({}, value) : value   );       !const getCopiedArray = value => (   @    value instanceof Array ? [...value] : getCopiedObject(value)   );       ^const getStateWithoutHistory = state => Object.entries(state).reduce((prev, [key, value]) => {   .    const newObject = Object.assign({}, prev);   1    if (['past', 'future'].indexOf(key) === -1) {   /        newObject[key] = getCopiedArray(value);       }       return newObject;   }, {});       export default reducer => {       const initialState = {           past: [],           future: []       };   .    return (state = initialState, action) => {   '        const { past, future } = state;   6        const present = getStateWithoutHistory(state);           switch (action.type) {               case 'UNDO': {   #                if (!past.length) {   !                    return state;                   }       9                const previousPosition = past.length - 1;   8                const previous = past[previousPosition];   @                const newPast = past.slice(0, previousPosition);   N                const pageToRemove = (present.deck.pages || []).filter(page =>   /                    previous.deck.pages.filter(   E                        previousPage => page._id === previousPage._id   "                    ).length !== 1                   )[0] || null;       #                if (pageToRemove) {                       api   F                        .delete({ path: `pages/${pageToRemove._id}` })   :                        .catch(err => console.error(err));                   }       &                return Object.assign({   "                    past: newPast,   0                    future: [present, ...future]                   }, previous);               }               case 'REDO': {   %                if (!future.length) {   !                    return state;                   }       '                const next = future[0];   2                const newFuture = future.slice(1);   J                const pageToReadd = (next.deck.pages || []).filter(page =>   .                    present.deck.pages.filter(   C                        presentPage => page._id === presentPage._id   "                    ).length !== 1                   )[0] || null;       "                if (pageToReadd) {                       api                           .post({   ;                            path: `decks/${next.deck._id}`,   #                            body: {   !                                [   L                                    ...next.deck.pages.map(page => page.id),   &                                    {}   !                                ]                               }                           })   :                        .catch(err => console.error(err));                   }       &                return Object.assign({   -                    past: [...past, present],   %                    future: newFuture                   }, next);               }               default: {   <                const newPresent = reducer(present, action);       Q                if ((newPresent.build.page || false) && present === newPresent) {   !                    return state;                   }       !                const history = {   $                    past: [...past],                       future: []                   };                       if (                       (   (                        present.build &&   -                        present.build.page &&   H                            JSON.stringify(present.build.page || {}) !==   G                            JSON.stringify(newPresent.build.page || {})                       ) || (   E                        present.deck && present.deck.pages.length !==   4                        newPresent.deck.pages.length                       )                   ) {   6                    history.past = [...past, present];                   }       :                return Object.assign(history, newPresent);               }   	        }       };   };5�_�                    G        ����                                                                                                                                                                                                                                                                                                                            K   8       K   9       V   9    Z�s     �   F   H   s      !                                [   L                                    ...next.deck.pages.map(page => page.id),5�_�                     G   !    ����                                                                                                                                                                                                                                                                                                                            J   8       J   9       V   9    Z�t     �   F   H   r      J                                [ ...next.deck.pages.map(page => page.id),   &                                    {}5�_�      !               G   J    ����                                                                                                                                                                                                                                                                                                                            I   8       I   9       V   9    Z�u    �   F   H   q      M                                [ ...next.deck.pages.map(page => page.id), {}   !                                ]5�_�       "           !   G        ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z�    �   F   H   p      O                                [ ...next.deck.pages.map(page => page.id), {} ]5�_�   !   #           "   G   (    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z��    �   o   q          };�   n   p              };�   m   o          	        }�   l   n                      }�   k   m          :                return Object.assign(history, newPresent);�   j   l           �   i   k                          }�   h   j          6                    history.past = [...past, present];�   g   i                          ) {�   f   h                              )�   e   g          4                        newPresent.deck.pages.length�   d   f          E                        present.deck && present.deck.pages.length !==�   c   e                              ) || (�   b   d          G                            JSON.stringify(newPresent.build.page || {})�   a   c          H                            JSON.stringify(present.build.page || {}) !==�   `   b          -                        present.build.page &&�   _   a          (                        present.build &&�   ^   `                              (�   ]   _                          if (�   \   ^           �   [   ]                          };�   Z   \                              future: []�   Y   [          $                    past: [...past],�   X   Z          !                const history = {�   W   Y           �   V   X                          }�   U   W          !                    return state;�   T   V          Q                if ((newPresent.build.page || false) && present === newPresent) {�   S   U           �   R   T          <                const newPresent = reducer(present, action);�   Q   S                      default: {�   P   R                      }�   O   Q                          }, next);�   N   P          %                    future: newFuture�   M   O          -                    past: [...past, present],�   L   N          &                return Object.assign({�   K   M           �   J   L                          }�   I   K          :                        .catch(err => console.error(err));�   H   J                                  })�   G   I                                      }�   F   H          V                                pages: [ ...next.deck.pages.map(page => page.id), {} ]�   E   G          #                            body: {�   D   F          ;                            path: `decks/${next.deck._id}`,�   C   E                                  .post({�   B   D                              api�   A   C          "                if (pageToReadd) {�   @   B           �   ?   A                          )[0] || null;�   >   @          "                    ).length !== 1�   =   ?          C                        presentPage => page._id === presentPage._id�   <   >          .                    present.deck.pages.filter(�   ;   =          J                const pageToReadd = (next.deck.pages || []).filter(page =>�   :   <          2                const newFuture = future.slice(1);�   9   ;          '                const next = future[0];�   8   :           �   7   9                          }�   6   8          !                    return state;�   5   7          %                if (!future.length) {�   4   6                      case 'REDO': {�   3   5                      }�   2   4                          }, previous);�   1   3          0                    future: [present, ...future]�   0   2          "                    past: newPast,�   /   1          &                return Object.assign({�   .   0           �   -   /                          }�   ,   .          :                        .catch(err => console.error(err));�   +   -          F                        .delete({ path: `pages/${pageToRemove._id}` })�   *   ,                              api�   )   +          #                if (pageToRemove) {�   (   *           �   '   )                          )[0] || null;�   &   (          "                    ).length !== 1�   %   '          E                        previousPage => page._id === previousPage._id�   $   &          /                    previous.deck.pages.filter(�   #   %          N                const pageToRemove = (present.deck.pages || []).filter(page =>�   "   $          @                const newPast = past.slice(0, previousPosition);�   !   #          8                const previous = past[previousPosition];�       "          9                const previousPosition = past.length - 1;�      !           �                                 }�                !                    return state;�                #                if (!past.length) {�                            case 'UNDO': {�                        switch (action.type) {�                6        const present = getStateWithoutHistory(state);�                '        const { past, future } = state;�                .    return (state = initialState, action) => {�                    };�                        future: []�                        past: [],�                    const initialState = {�                export default reducer => {�                 �                }, {});�                    return newObject;�                    }�                /        newObject[key] = getCopiedArray(value);�                1    if (['past', 'future'].indexOf(key) === -1) {�                .    const newObject = Object.assign({}, prev);�   
             ^const getStateWithoutHistory = state => Object.entries(state).reduce((prev, [key, value]) => {�   	              �      
          );�      	          @    value instanceof Array ? [...value] : getCopiedObject(value)�                !const getCopiedArray = value => (�                 �                );�                >    value instanceof Object ? Object.assign({}, value) : value�                "const getCopiedObject = value => (�                 �                 !import api from '#Utilities/api';5�_�   "   $           #   G   (    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z��   	 �   F   H   p      T                                pages: [...next.deck.pages.map(page => page.id), {}]5�_�   #   %           $   G   (    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z��   
 �   F   H   p      S                                pages: [..next.deck.pages.map(page => page.id), {}]5�_�   $   &           %   ,   )    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z��     �   +   -   p      F                        .delete({ path: `pages/${pageToRemove._id}` })5�_�   %               &   ,   1    ����                                                                                                                                                                                                                                                                                                                            H   8       H   9       V   9    Z��    �   +   -   p      P                        .delete({ path: `decks/${}/pages/${pageToRemove._id}` })5�_�                   H   '    ����                                                                                                                                                                                                                                                                                                                            K   8       K   9       V   9    Z�f     �   G   I   s      M                                    ... next.deck.pages.map(page => page.id),5�_�                   H   '    ����                                                                                                                                                                                                                                                                                                                            K   8       K   9       V   9    Z�T     �   G   I   s      M                                    ...(next.deck.pages.map(page => page.id),5�_�                     H   L    ����                                                                                                                                                                                                                                                                                                                            K   8       K   9       V   9    Z�W    �   G   I   s      N                                    ...(next.deck.pages.map(page => page.id)),5�_�                   G        ����                                                                                                                                                                                                                                                                                                                            G   8       G   8       V   8    Z��     �   F   I        5�_�                   G   8    ����                                                                                                                                                                                                                                                                                                                            G   8       G   8       V   8    Z��     �   F   I        5�_�                    G       ����                                                                                                                                                                                                                                                                                                                            H   8       H   8       V   8    Z��     �   F   G   o                                       �   F   H   p      "                                {}5�_�                    G        ����                                                                                                                                                                                                                                                                                                                            H   8       H   8       V   8    Z��     �   F   H   p      #                                [{}5�_�                     G   #    ����                                                                                                                                                                                                                                                                                                                            H   8       H   8       V   8    Z��     �   F   H   p      $                                [{}]5��