
def decor1(greet):
    def inner():
        print("DECOR 1 --start")
        greet()
        print("DECOR 1 --end")
    return inner

def decor2(greet):
    def inner():
        print("DECOR 2 --start")
        greet()
        print("DECOR 2 --end")
    return inner

@decor1
@decor2

def greet():
    print("Hello")
    
greet()