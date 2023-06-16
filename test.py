# ACTION_TO_RIGHT = {
#     'read': 'R',
#     'write': 'W',
#     'execute': 'X',
# }

# def restore_file_access():
#     file_rights = {}
#     num_files = int(input())
#     for _ in range(num_files):
#         file_info = input().split()
#         filename = file_info[0]
#         rights = set(file_info[1:])
#         file_rights[filename] = rights
    
#     num_requests = int(input())
#     output = []
#     for _ in range(num_requests):
#         request = input().split()
#         action = request[0]
#         filename = request[1]
#         if ACTION_TO_RIGHT.get(action) in file_rights.get(filename, set()):
#             output.append('OK')
#         else:
#             output.append('Access denied')
    
#     return output

# output = restore_file_access()
# for result in output:
#     print(result)
# Function to find the sequence C


# def find_sequence(A, B):
#     unique_elements = set(A + B)
#     C = sorted(unique_elements)
#     return C

# T = int(input())
# for _ in range(T):
#     n, m = map(int, input().split())
#     A = list(map(int, input().split()))
#     B = list(map(int, input().split()))
#     C = find_sequence(A, B)
#     print(" ".join(map(str, C)))



# def count_younger_planets(ages):
#     n = len(ages)
#     counts = []

#     for i in range(n):
#         count = 0
#         for j in range(n):
#             if ages[j] < ages[i]:
#                 count += 1
#         counts.append(count)
    
#     return counts

# # Read input
# n = int(input())
# ages = list(map(int, input().split()))

# # Count younger planets
# result = count_younger_planets(ages)

# # Print the result on a single line
# print(" ".join(map(str, result)))

import re

# def main(password):
#     if len(password) < 6 or len(password) > 16:
#         return "NO"
#     if not re.search(r'[a-z]', password):
#         return "NO"
#     if not re.search(r'[A-Z]', password):
#         return "NO"
#     if not re.search(r'\d', password):
#         return "NO"
#     if not re.search(r'[$#@]', password):
#         return "NO"
#     return "YES"

# password = input("Enter the password: ")
# result = main(password)
# print(result)



# def generate_unique_file_names(n, filenames):
#     unique_names = []
#     used_names = set()

#     for i in range(n):
#         filename = filenames[i]
#         unique_name = filename

#         if unique_name in used_names:
#             count = 1
#             while f"{filename}({count})" in used_names:
#                 count += 1
#             unique_name = f"{filename}({count})"

#         used_names.add(unique_name)
#         unique_names.append(unique_name)

#     return unique_names

# n = int(input())
# filenames = []

# for _ in range(n):
#     filename = input()
#     filenames.append(filename)

# result = generate_unique_file_names(n, filenames)
# print(" ".join(map(str, result)))

# import math

# def main(N, C, T, candies):
#     candies.sort() 
#     total_candies = sum(candies[:C])  
#     time = math.ceil(total_candies / T) 
#     return time


# N, C, T = map(int, input().split())
# candies = list(map(int, input().split()))
# result = main(N, C, T, candies)
# print(result)

# def find(A, B):
#     return sorted(set(A+ B))

# T = int(input())
# for _ in range(T):
#     n,m = map(int, input().split())
#     A = list(map(int, input().split()))
#     B = list(map(int, input().split()))
#     C = find(A,B)
#     print(" ".join(map(str, C)))

# def canCompleteCircuit(gas, cost):
#     tank = 0
#     start = 0
#     sumGas = 0
#     sumCost = 0
    
#     for i in range(len(gas)):
#         sumGas += gas[i]
#         sumCost += cost[i]
#         tank += (gas[i] - cost[i])
        
#         if tank < 0:
#             start = i + 1
#             tank = 0
    
#     if sumGas < sumCost:
#         return -1
#     return start

# def recover_access_rights(N, files, M, requests):
#     access_rights = {}

#     # Store the allowed operations for each file
#     for file in files:
#         filename, operations = file.split()
#         access_rights[filename] = set(operations)

#     # Process the requests and check if they are allowed
#     for i in range(M):
#         requested_file, operation = requests[i].split()

#         if requested_file in access_rights and operation in access_rights[requested_file]:
#             print("OK")
#         else:
#             print("Access Denied")

# # Read input
# N = int(input())
# files = []
# for _ in range(N):
#     files.append(input())

# M = int(input())
# requests = []
# for _ in range(M):
#     requests.append(input())

# # Recover access rights
# recover_access_rights(N, files, M, requests)

# n = int(input())

# image = [
#     "oxo",
#     "oxx",
#     "ooo"
# ]

# res = []
# for row in image:
#     rows = ""
#     for char in row:
#         rows += char * n
#     for _ in range(n):
#         res.append(rows)

# for row in res:
#     print(row)

# keypad = {
#     '2': 'abc',
#     '3': 'def',
#     '4': 'ghi',
#     '5': 'jkl',
#     '6': 'mno',
#     '7': 'pqrs',
#     '8': 'tuv',
#     '9': 'wxyz'
# }

# message = input().strip()
# seconds = 0
# prev_button = ''

# for char in message:
#     for button, letters in keypad.items():
#         if char in letters:
#             if button == prev_button:
#                 seconds += 2
#             seconds += letters.index(char) + 1
#             prev_button = button
#             break

# print(seconds)

# N = int(input())
# commas = 0

# for number in range(1, N + 1):
#     number_str = str(number)
#     digits = len(number_str)
#     commas += (digits - 1) // 3

# print(commas)

n = int(input())
commas = 0

for i in range(1, n+1):
    commas += len(str(i)) - 1

print(commas)