Vim�UnDo� ,�p�����M��� �)7�s�h��;U                                       Z�,    _�                             ����                                                                                                                                                                                                                                                                                                                                                             Z�V     �                   �             5�_�                       	    ����                                                                                                                                                                                                                                                                                                                                                             Z�Y     �               
    disp()5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             Z�^     �                   disp(signal)5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             Z�_     �                   �             5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             Z�j    �                   chunk = signal5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             Z�s    �                    disp(signal);5�_�                           ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�    �                 endfunction5�_�      	                 	    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z��    �                   chunk = signal;5�_�      
           	      $    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z��     �                %function chunks = splitSignal(signal)5�_�   	              
      )    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z��     �                   �             5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z��     �                    chunkCount = 5�_�                          ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z��     �                   �             5�_�                       '    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�*     �               '    chunkCount = info.totalSamples / 185�_�                           ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�e     �               (    chunkCount = info.totalSamples / 1805�_�                           ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�l     �               1    chunkCount = getfield(info.totalSamples / 1805�_�                       ,    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�n     �               2    chunkCount = getfield(info, totalSamples / 1805�_�                       ,    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�p     �               3    chunkCount = getfield(info, totalSamples) / 1805�_�                            ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z�r     �               4    chunkCount = getfield(info, totalSamples') / 1805�_�                       /    ����                                                                                                                                                                                                                                                                                                                               /          4       v   4    Z�    �               5    chunkCount = getfield(info, 'totalSamples') / 1805�_�                       !    ����                                                                                                                                                                                                                                                                                                                               /          4       v   4    Z�     �               /    chunkCount = getfield(info, 'totalSamples')5�_�                       !    ����                                                                                                                                                                                                                                                                                                                               /          4       v   4    Z�    �               .    chunkCount = getfield(info, 'otalSamples')5�_�                       !    ����                                                                                                                                                                                                                                                                                                                               !          -       v   -    Z�*     �               /    chunkCount = getfield(info, 'TotalSamples')5�_�                        !    ����                                                                                                                                                                                                                                                                                                                               !          -       v   -    Z�+    �               "    chunkCount = getfield(info, ')5�_�                           ����                                                                                                                                                                                                                                                                                                                                         
       v   
    Z��    �                   �                   info5��