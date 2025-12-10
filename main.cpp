#include <iostream>
#include <string>
#include <memory>
using namespace std;

void swap(int&a,int&b){
    int temp=move(a);
    a=move(b);
    b=move(temp);
}




int main(){

    int a=3;
    int b=4;
    swap(a,b);
    cout<<a<<endl;

    return 0;
}

