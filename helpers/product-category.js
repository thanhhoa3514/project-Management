const ProductCategory = require("../models/product-category.model");

module.exports.getSubCategory = async (parentId) => {
    const getCategory= async (parentId) => {

        const subCategory = await ProductCategory.find({
          parent_id: parentId,
          status: "active",
          deleted: false,
        });
      
        let allSub = [...subCategory];
      
        for (const sub of subCategory) {
          const children = await getCategory(sub.id);
          allSub = allSub.concat(children);
        }
        return allSub;
    };
  // console.log(allSub);
  const result = await getCategory(parentId);
  return result;
};
