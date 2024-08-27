def two_sum(nums, k):
    complements = set()
    for num in nums:
        if (k - num) in complements:
            return "yes"  # Found two numbers that sum to k
        complements.add(num)
    return "no"  # No two numbers found

if __name__ == "__main__":
    n = int(input())  # Input size of array
    k = int(input())  # Input target k
    nums = list(map(int, input().split()))  # Input array elements
    
    print(two_sum(nums, k))  # Output result
