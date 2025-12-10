#include <iostream>
#include <string>
// #include<vector>

constexpr int maxbuffer=1024;
using namespace std;


int main(){

    static const char * originalfile="originalfile.txt";
    const char* informatin="Caroline, don't go into the light ";

    // std::FILE * fh=fopen(originalfile,"a");

    // // fclose(fh);

    // cout<<"file closed"<<endl;
    
    
    // for (int i=0;i<50;++i){
    //     fputs(informatin,fh);
    // }
    // fclose(fh);

    char buff[maxbuffer];

    FILE  * fh =fopen(originalfile,"r");
    while (fgets(buff,maxbuffer,fh)){
        fputs(buff,stdout);
        
    }
    fclose(fh);



    // remove(originalfile);


    return 0;
}



