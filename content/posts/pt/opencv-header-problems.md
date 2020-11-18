---
title: "Consertando erros de linkagem das dependências do OpenCV no Ubuntu 18.04"
date: 2020-03-14
tags:
  - OpenCV
  - C++
---

## O problema

Adicionar códigos de terceiros em uma aplicação C++ é bem conhecido por não ser uma experiência agradavel, requerindo do usuário o conhecimento de passos do processo de compilação, do ambiente do sistema operacional e a diferença entre os tipos de bibliotecas (linkagem estática ou dinâmica). O problema é tão incômodo que algumas bibliotecas do C++ razoavelmente grandes como [Catch2](https://github.com/catchorg/Catch2) e [Boost](https://www.boost.org/) oferecem soluções apenas com headers para simplificar a integração da biblioteca no processo de compilação.

OpenCV é uma biblioteca com várias dependencias e desse modo não está livre desse processo de configuração complexo. Por sorte, alguns usuários experientes da biblioteca fizeram tutoriais detalhados para ajudar iniciantes a se beneficiar da biblioteca, como [esse aqui](https://www.learnopencv.com/install-opencv-3-4-4-on-ubuntu-18-04/) que utilizei para instalar a biblioteca no meu computador.

Eu pensei que após terminar o tutorial, seria possível executar `g++` e seguir com a minha vida, mas isso acabou não sendo verdade, o que me levou em uma jornada de multiplas horas tentando entender se eu havia feito algo de errado. Então decidi escrever este artigo para documentar quais o passos que estavam faltando, caso alguem possua os mesmos problemas que eu.

*Se você não quiser ler a explicação dos problemas e quer apenas consertá-las rapidamente, eu fiz um [TLDR](#tldr)*

## Os passos que faltam para compilar corretamente

No final do tutorial, nós somos instruídos a executar o seguinte comando para compilar o código dependente do OpenCV:

```bash{promptUser: edujtm}
g++ `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc` my_sample_file.cpp -o my_sample_file
```
<br/>

Com `<OpenCV_Home_Dir>/installation` sendo o diretório onde devemos instalar a biblioteca OpenCV. Eu modifiquei este diretório para que ele ficasse de acordo com a minha organização de pastas, então no meu caso a biblioteca foi instalado no seguinte local:

```
$HOME/Code/local/OpenCV-3.4.4/
```
<br/>

Infelizmente, após executar este comando eu estava obtendo várias referência indefinidas para funções do OpenCV.

```
hello_world.cpp:(.text+0x5f): undefined reference to "cv::imread(cv::String const&, int)"
hello_world.cpp:(.text+0xb3): undefined reference to "cv::imshow(cv::String const&, cv::_InputArray const&)"
hello_world.cpp:(.text+0xdb): undefined reference to "cv::waitKey(int)"
```
<br/>

Para entender porque este erro está acontencendo, vamos primeiramente olhar para a saída do comando pkg-config.

```bash{promptUser: edujtm}
pkg-config --cflags --libs $HOME/Code/local/OpenCV-3.4.4/lib/pkgconfig/opencv.pc
```
<br/>

Executando o comando acima, obtem-se:

```
-I/home/edujtm/Code/local/OpenCV-3.4.4/include/opencv -I/home/edujtm/Code/local/OpenCV-3.4.4/include -L/home/edujtm/Code/local/OpenCV-3.4.4/lib 
-lopencv_stitching -lopencv_superres -lopencv_videostab -lopencv_aruco -lopencv_bgsegm -lopencv_bioinspired -lopencv_ccalib -lopencv_cvv 
-lopencv_dnn_objdetect -lopencv_dpm -lopencv_highgui -lopencv_videoio -lopencv_face -lopencv_freetype -lopencv_fuzzy -lopencv_hdf -lopencv_hfs 
-lopencv_img_hash -lopencv_line_descriptor -lopencv_optflow -lopencv_reg -lopencv_rgbd -lopencv_saliency -lopencv_sfm -lopencv_stereo 
-lopencv_structured_light -lopencv_phase_unwrapping -lopencv_surface_matching -lopencv_tracking -lopencv_datasets -lopencv_text -lopencv_dnn -lopencv_plot 
-lopencv_xfeatures2d -lopencv_shape -lopencv_video -lopencv_ml -lopencv_ximgproc -lopencv_xobjdetect -lopencv_objdetect -lopencv_calib3d -lopencv_imgcodecs 
-lopencv_features2d -lopencv_flann -lopencv_xphoto -lopencv_photo -lopencv_imgproc -lopencv_core
```
<br/>

Isto é a lista gigante de modulos do OpenCV que você precisa especificar para que o linker seja capaz de encontrar os binários pre-compilados do OpenCV. Você não precisa especificar todos eles, apenas aqueles que você pretende utilizar, mas o pkg-config adicionar todos para que você não tenha problemas ao utilizar diferentes modulos.

Então essencialmente a mensagem de erro está acontecendo porque o linker não está conseguindo encontrar os binários com a definição da funções do OpenCV, mesmo que elas estejam sendo especificadas na linha de comando.

O que me surpreendeu foi que a ordem em que você declara as bibliotecas na linha de comando é importante para o processo de linkagem. Isto é explicado brevemente [nesse comentário de Ivan Aksamentov](https://stackoverflow.com/questions/31634757/how-to-correct-undefined-reference-error-in-compiling-opencv/31635489#31635489).

> Em suma, a regra "bibliotecas vêm antes dos objetos que as usam" é imposta por várias distribuições do GCC para linkar bibliotecas apenas quando elas são necessárias. No seu caso, o arquivo de objeto facerec\_eigenfaces.o, que é produzido pelo código fonte facerec\_eigenfaces.cpp, depende das bibliotecas OpenCV (a lista exata é dada pelo comando pkg-config), e assim as bibliotecas devem vir após aquele arquivo. Você pode também notar esse padrão na saída do comando pkg-config: por exemplo, X11, pthreads e outras dependências do sistema linux aparecem depois das dependências em bibliotecas OpenCV.


De forma breve: se o seu código fonte depende de um arquivo linkado, ele deve aparecer antes do arquivo linkado na linha de comando. Seguindo isso, a forma correta de fazer a chamada do comando é colocando o pkg-config depois dos arquivos, desse modo:

```bash{promptUser: edujtm}
g++ my_sample_file.cpp -o my_sample_file `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc`
```
<br/>

Após consertar isto, os arquivos passaram a compilar corretamente. Mas agora o seguinte estava ocorrendo no runtime:

```
./hello_world: error while loading shared libraries: libopencv_highgui.so.3.4: cannot open shared object file: No such file or directory
```
<br/>

Bom, progredimos um pouco, mas ainda não estamos lá. Nós movemos de um problema de linkagem para um problema de biblioteca compartilhada. A biblioteca é chamada de compartilhada devido ao fato de apenas um único binário poder ser utilizado por vários programas no runtime, contando que eles possam encontrá-lo.

O que está acontecendo agora é que, quando executamos o arquivo, o sistema operacional é incapaz de encontrar algumas bibliotecas compartilhadas do OpenCV. Nós precisamos passar a informação sobre onde as bibliotecas estão localizadas pro SO de alguma forma.

A forma recomendada de fazer isso no linux é adicionando um arquivo *.conf* em `/etc/ld.so.conf.d`. Eu criei um arquivo *opencv.conf* com o seguinte conteúdo:

```bash{promptUser: edujtm}
echo "/home/edujtm/Code/local/OpenCV-3.4.4/lib" > opencv.conf
```
<br/>

Se você seguiu [o tutorial](https://www.learnopencv.com/install-opencv-3-4-4-on-ubuntu-18-04/) seu diretório *lib* deve estar localizado em `<OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib` .

Por fim, movemos o arquivo *.conf* para `/etc/ld.so.conf.d/` e rodamos ldconfig, que irá adicionar as novas bibliotecas compartilhadas em sua cache.

```bash{promptUser: edujtm}
sudo mv opencv.conf /etc/ld.so.conf.d/
sudo ldconfig
```
<br/>

Já que isso era um problema a nível de sistema operacional, seus binários compilados devem funcionar corretamente, mesmo sem precisar refazer a compilação.

## TL;DR

### Passo 1: Mude a ordem do comando g++ 

Mude o comando descrito no tutorial, colocando as bibliotecas dependentes no final:

```bash
g++ `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc` my_sample_file.cpp -o my_sample_file
# Mude para 
g++ my_sample_file.cpp -o my_sample_file `pkg-config --cflags --libs <OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib/pkgconfig/opencv.pc`
```
<br/>

### Passo 2: Adicione bibliotecas compartilhadas em /etc/ld.so.conf.d/ 

Crie um arquivo *.conf* apontando para o diretório de bibliotecas compartilhadas do OpenCV. Coloque-o em `/etc/ld.so.conf.d/` e execute ldconfig.

```bash
echo "<OpenCV_Home_Dir>/installation/OpenCV-3.4.4/lib" > opencv.conf
sudo mv opencv.conf /etc/ld.so.conf.d/
sudo ldconfig
```
