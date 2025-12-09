#include <iostream>
#include <string>
using namespace std;

class one{
public:
    virtual void intro(){
        cout<<"i am one\n";
    }

};

class two:public one{
    public:
        void intro(){
            cout <<"i am two"<<endl;
        }
};
class three:public one{
    public:
        void intro(){
            cout <<"i am three"<<endl;
        }
};

int main(){

    one *a;
    two b;
    three c;

    a=&b;
    a->intro();
    a=&c;
    a->intro();
    return 0;


}

