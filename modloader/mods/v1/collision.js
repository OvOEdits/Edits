
(function () {
    let old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    let runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;

    let notify = (title, text, image = "./speedrunner.png") => {
        cr.plugins_.sirg_notifications.prototype.acts.AddSimpleNotification.call(
            runtime.types_by_index.find(
                (type) => type.plugin instanceof cr.plugins_.sirg_notifications
            ).instances[0],
            title,
            text,
            image
        );
    };

    let collision = {
        init() {
            document.addEventListener("keydown", (event) => {
                if (event.code === "KeyQ") {
                    if (event.shiftKey) {
                        this.toggleCollision();
                    }
                }
                if (event.code === "KeyW") {
                    if (event.shiftKey) {
                        this.checkCollision();
                    }
                }
            });

            this.interval = null;
            globalThis.ovoCollision = this;
            notify("Mod loaded", "Collision mod loaded");
        },

        toggleCollision() {
            if (getPlayer().collisionsEnabled){
                getPlayer().collisionsEnabled = false
            }else{
            getPlayer().collisionsEnabled = true
            }
        },

        checkCollision() {
            if (getPlayer().collisionsEnabled){
                notify("Collision Check", "Collisions On")
            }else{
                notify("Collision Check", "Collisions Off")
            }
        }
    }


    function getPlayer() {
        return runtime.types_by_index
            .filter(
                (x) =>
                    !!x.animations &&
                    x.animations[0].frames[0].texture_file.includes("collider")
            )[0]
            .instances.filter(
                (x) => x.instance_vars[17] === "" && x.behavior_insts[0].enabled
            )[0];
    }

    function getFlag() {
        return runtime.types_by_index.find(
            (x) =>
                x.name === "EndFlag" ||
                (x.plugin instanceof cr.plugins_.Sprite &&
                    x.all_frames &&
                    x.all_frames[0].texture_file.includes("endflag"))
        ).instances[0];
    }

    collision.init();
})()