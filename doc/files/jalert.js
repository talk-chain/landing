jconfirm.defaults = {
    scrollToPreviousElement: false,
    scrollToPreviousElementAnimate: false,
};

function jalert(c, t = "", a = "") {
    $.alert({
        title: t,
        content: c,
        buttons: {
            confirm: {
                text: "Confirm",
                action: function () {
                    if (a) {
                        a;
                    }
                },
            },
        },
    });
}

function jalert_url(c, u, t = "", f = "") {
    $.alert({
        title: t,
        content: c,
        buttons: {
            confirm: {
                text: "Confirm",
                action: function () {
                    if (u == "back") {
                        history.go(-1);
                    } else if (u == "reload") {
                        location.hash = "";
                        location.reload();
                    } else if (u == "focus") {
                        $(f).focus()
                    } else {
                        if (u == "function") {
                            document.write(f);
                        } else {
                            location.replace(u);
                        }
                    }
                },
            },
        },
    });
}
