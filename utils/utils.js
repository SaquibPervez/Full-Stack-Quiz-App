const authCheck = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.replace('../index.html');
        return;
    }
};

const authUserCheck = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.replace('../../index.html');
        return;
    }

    const userData = JSON.parse(user);

    if (userData.type !== "user") {
        window.location.replace("/admin/dashboard/dashboard.html");
    }
};

const authAdminCheck = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.replace('../index.html');
        return;
    }

    const userData = JSON.parse(user);

    if (userData.type !== "admin") {
        window.location.replace("/user/dashboard/dashboard.html");
    }
};

export {
    authCheck,
    authUserCheck,
    authAdminCheck
};
