from random import  randint


a = int(input("Enter the lower limit: "))
b = int(input("Enter the upper limit: "))

if a > b:
    print("Lower limit should be less than upper limit.")
else:
    print("Random number between", a, "and", b, "is", randint(a, b))