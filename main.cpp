#include <iostream>
#include <string>
using namespace std;
// #include "adder.h"


class user{
    int _secret=22;

public:
    string name="default";

    void classMessage(){cout<<"class is greart,"<<name<<endl;}

    void serSecert(const  auto & newsecrert){_secret=newsecrert;}
    int getSecret(){return _secret;}
    
    
};


int main(){

    user sam;
    sam.name="sam";
    sam.classMessage();
    sam.serSecert(100);
    cout<< sam.getSecret()<<"oma"<<endl;

    return 0;


}

