const createTreeCategory = (arr, parentID = "") => {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentID) {
      const newItem = item;
      const children = createTreeCategory(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
};

module.exports.tree = (arr, parentID = "") => {
  const tree = createTreeCategory(arr, parentID = "");

  return tree;
};
