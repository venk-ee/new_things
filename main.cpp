#include <iostream>
#include <string>
// #include<vector>

using namespace std;

class MyFloat{
    float ft;

public:
    MyFloat(){
        ft=0.1;
    }

    void getvalue(){
        cout<<ft<<endl;
    }

    void operator ()(float v){
        ft+=v;
    }
};

int main(){

    MyFloat floaty;
    floaty.getvalue();

    floaty(1.0);
    floaty.getvalue();


    return 0;
}