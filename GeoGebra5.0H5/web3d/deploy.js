
window.geogebra = {

    render: function (element, base64, width, height, callback) {

        function getProperties() {

            var _properties = {
                showToolbarHelp: false,
                enableLabelDrags: false,
                enableShiftDragZoom: true,
                showResetIcon: false,
                algebraInputPosition: "bottom",
                errorDialogsActive: false,
                showTutorialLink: false,
                width: 1440,
                height: 720,
                showToolbar: false,
                language: "zh-CN"
            };

            if(base64.indexOf('http') === 0) {
                _properties['filename'] = base64;
            }
            else {
                _properties['ggbBase64'] = base64;
            }

            var properties = {};

            for(var key in _properties) {
                properties["data-param-" + key] = _properties[key];
            }

            properties.tabIndex = 10;

            return properties;

        }

        function render(element, width, height) {

            var player = document.querySelector(element),
                container = document.createElement("div"),
                object = document.createElement("div");

            player.appendChild(container);
            container.appendChild(object);
            object.style.visibility = "hidden";
            container.style.cssText = "width: "+width+"px; height: "+height+"px; transform-origin: 0% 0% 0px;";

            var properties = getProperties();

            for (var key in properties) {
                object.setAttribute(key, properties[key]);
            }

            window.renderGGBElement(object, function () {
                var scaleX = width / 1440,
                    scaleY = height / 720;
                object.setAttribute('data-scaleX', scaleX.toString());
                object.setAttribute('data-scaleY', scaleY.toString());
                object.removeAttribute('data-param-ggbBase64');
                container.style.cssText += "transform: scale(" + scaleX + ", " + scaleY + ");";
                object.style.visibility = "visible";
                callback && callback();
            });

        }

        var listener = setInterval(function () {
            if (window.renderGGBElement) {
                render(element, width, height);
                clearInterval(listener);
            }
        }, 200)

    }

}
