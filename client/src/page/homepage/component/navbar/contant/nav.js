export const navs = [
    {
        Id1: "#collapse1",
        Id2: "collapse1",
        id: "general",
        name: "TRANG CHỦ",
        IconID: "icon1", 
        children: [{
                name: "TRANG CHỦ",
                href: "/"
            }
        ]
    }, {
        Id1: "#collapse2",
        Id2: "collapse2",
        id: "general",
        name: "HỢP TÁC",
        IconID: "icon2", 
        children: [{
                name: "KÝ KẾT",
                href: "/cooperation"
            }, {
                name: "HOẠT ĐỘNG HỢP TÁC",
                href: "/cooperation-table"
            }, {
                name: "HĐHT CỤ THỂ",
                href: "/cooperation-detail"
            }
        ]
    }, {
        Id1: "#collapse3",
        Id2: "collapse3",
        id: "general",
        name: "QUẢN LÝ CHUNG",
        IconID: "icon3", 
        children: [{
                name: "QUẢN LÝ ĐỐI TÁC",
                href: "/manager-partner"
            }, {
                name: "ĐẠI DIỆN (KHOA/TRƯỜNG)",
                href: "/manager-member-sign"
            }, {
                name: "ĐẠI DIỆN (ĐỐI TÁC)",
                href: "/manager-partner-sign"
            }
        ]
    }, {
        Id1: "#collapse4",
        Id2: "collapse4",
        id: "admin",
        name: "ADMIN",
        IconID: "icon4", 
        children: [{
                name: "QUẢN LÝ KHOA",
                href: "/manager-faculty"
            }, {
                name: "QUẢN LÝ ACCOUNT",
                href: "/manager-account"
            },{
                name: "QUẢN LÝ QUỐC GIA",
                href: "/manager-country"
            } 
        ]
    }
]