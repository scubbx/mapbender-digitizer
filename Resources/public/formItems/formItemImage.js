(function () {
    "use strict";

    window.FormItemImage = {

        process: function(feature) {
            var item = this.clone();
            var schema = item.schema;
            var widget = schema.widget;

            if (!item.origSrc) {
                item.origSrc = item.src;
            }

            if (item.name && feature.data[item.name]) {
                item.dbSrc = feature.data[item.name];
                if (schema.featureType.files) {
                    schema.featureType.files.forEach(function (fileInfo) {
                        if (fileInfo.field === item.name) {
                            if (fileInfo.uri) {
                                item.dbSrc = fileInfo.uri + "/" + item.dbSrc;
                            } else {
                                item.dbSrc = widget.options.fileUri + "/" + schema.featureType.table + "/" + item.name + "/" + item.dbSrc;
                            }
                        }
                    });
                }
            }

            var src = item.dbSrc || item.origSrc;
            item.src = item.relative ? Mapbender.configuration.application.urls.asset + src : src;
            return item;
        }

    };

    Object.setPrototypeOf(FormItemImage, FormItem);

})();