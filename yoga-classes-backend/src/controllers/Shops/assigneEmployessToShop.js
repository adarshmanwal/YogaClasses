const { Shop,User } = require("../../../models");
async function assignEmployee(req, res) {
    const { shopId, employeeId } = req.body;
  try {
    // Validate input
    if (!shopId || !employeeId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Find the shop by ID
    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    // Find the employee by ID
    const employee = await User.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // Assign the employee to the shop
    await Shop.update(
      { hasAccess: [employeeId] },
      { where: { id: shopId } }
    );

    return res.status(200).json({
      success: true,
      message: "Employee assigned to shop successfully",
      data: { shopId, employeeId },
    });
  } catch (error) {
    console.log(error);
  }
}


exports.assignEmployee = assignEmployee;
