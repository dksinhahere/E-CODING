
import array


arr = array.array("i", [1, 2, 3, 4, 5, 6, 7, 8])
print(arr)

arr = array.array("f", [1, 2, 3, 4, 5, 6, 7, 8])
print(arr)

# print(arr[0], arr[1],arr[2],arr[3],arr[4],arr[5])

arr.extend([2, 4, 5])

print(arr)

arr.insert(0, 3000)

print(arr)

arr.pop()
print(arr)

print(arr.count(7.0))

lst = arr.tolist()
print(lst)

arr.fromlist(lst)
print(arr)

lst = [int(x) for x in lst]
arr = array.array("i", lst)
print(arr)