#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> num_to_index;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (num_to_index.find(complement) != num_to_index.end()) {
            return {num_to_index[complement], i};
        }
        num_to_index[nums[i]] = i;
    }
    return {};
}

int main() {
    int n, target;
    
    // Take input for the array size
    std::cout << "Enter the number of elements in the array: ";
    std::cin >> n;
    
    std::vector<int> nums(n);
    
    // Take input for the array elements
    std::cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; ++i) {
        std::cin >> nums[i];
    }
    
    // Take input for the target value
    std::cout << "Enter the target value: ";
    std::cin >> target;
    
    std::vector<int> result = twoSum(nums, target);

    // Output the result
    if (!result.empty()) {
        std::cout << "[" << result[0] << ", " << result[1] << "]" << std::endl;
    } else {
        std::cout << "No two sum solution found." << std::endl;
    }

    return 0;
}
