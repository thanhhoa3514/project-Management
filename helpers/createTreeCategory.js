let count = 0;

const createTreeCategory = (arr, parentID = "") => {
  const tree = [];

  arr.forEach((item) => {
      if (item.parent_id === parentID) {
        // Increment count for each item with a matching parent_id. This will ensure the index is unique across all items in the tree.
        count++;

        // Create a new item with the same properties as the original item, but with an index. This will ensure the index is unique across all items in the tree.
        const newItem = item;
        newItem.index = count;
        const children = createTreeCategory(arr, item.id);

        // If there are children, add them to the newItem. This is done to avoid unnecessary recursion for items with no children.
        if (children.length > 0) {
            newItem.children = children;
        }

        // Add the newItem to the tree array. This is done to create the final tree structure.
        tree.push(newItem);
    }
  });
  return tree;
};

module.exports.tree = (arr, parentID = "") => {

    // Reset count to 0 before creating the tree. This is important because when you load a server is constantly increasing
    count=0;
  const tree = createTreeCategory(arr, (parentID = ""));

  return tree;
};
