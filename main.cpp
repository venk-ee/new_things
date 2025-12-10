#include <iostream>
#include <string>
#include <memory>
using namespace std;

class user{
public:
    user(){
        cout<<"user created\n";
    }
    ~user(){
        cout<<"user destroyed\n";
    }

    void testfun(){
        cout<<"i am s test function\n";
    }
};




int main(){

    {

    // uniqur_ptr<user> sam=make_unique<user>(); // not allowed 
        unique_ptr<user> sam = make_unique<user>();

        sam->testfun();

    }

    cout <<"outside the scope\n";
    
    return 0;
}

