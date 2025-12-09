#include <iostream>
#include <string>
using namespace std;

class Man{
    string _name;
    int _age;
    Man(){}
protected:
    Man(const string & name,const int &age)
    : _name(name),_age(age){}
    void run(){puts("i can run");}
    int getAge(){return _age;}

public:
    void sayName()const;

};

void Man::sayName()const{
    cout << "my name is :" <<_name << " my age is "<<_age <<endl;
}

class Superman:public Man{
    bool flight;
public:
    Superman(string name):Man(name,26){};
    void run(){puts("i can run at light speed");}
};

class Spiderman:public Man{
    bool webbing;

public:
    Spiderman(string name):Man(name,19){}
    void run(){puts("i can run at normal speed ");}
};

int main(){

    Superman clark("kent");
    clark.sayName();
    clark.run();

    Spiderman perter("perter");
    perter.sayName();
    perter.run();


    return 0;


}

