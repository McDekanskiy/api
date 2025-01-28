const sequelize = require("./src/config");
const User = require("./src/models/user");

const changeUserRole = async (email, newRole) => {
    try {
        await sequelize.authenticate();
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log(`❌ Пользователь с email ${email} не найден.`);
            return;
        }

        user.role = newRole;
        await user.save();
        console.log(`✅ Роль пользователя ${email} изменена на ${newRole}`);
    } catch (e) {
        console.error("❌ Ошибка при изменении роли:", e);
    } finally {
        await sequelize.close();
    }
};

// Получаем аргументы из консоли
const [,, email, newRole] = process.argv;

if (!email || !newRole) {
    console.log("❌ Использование: node changeRole.js <email> <newRole>");
    process.exit(1);
}

changeUserRole(email, newRole);
