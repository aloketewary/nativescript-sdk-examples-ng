import { Component } from "@angular/core";
// >> trace-customtracewriter-imports
import { setCategories, enable, categories, messageType, clearWriters, addWriter, disable } from "trace";
import { isUndefined } from "utils/types";
// << trace-customtracewriter-imports

// >> trace-create-custom-writer
class TimestampConsoleWriter {
    public array = [];

    public write(message, category, type) {
        if (!console) {
            return;
        }
        let msgType = isUndefined(type) ? messageType.log : type;

        switch (msgType) {
            case messageType.log:
                this.array.push({
                    "messageType": "log",
                    "date": new Date().toISOString(),
                    "message": message,
                    "category": category
                });
                break;
            case messageType.info:
                this.array.push({
                    "messageType": "info",
                    "date": new Date().toISOString(),
                    "message": message,
                    "category": category
                });
                break;
            case messageType.warn:
                this.array.push({
                    "messageType": "warning",
                    "date": new Date().toISOString(),
                    "message": message,
                    "category": category
                });
                break;
            case messageType.error:
                this.array.push({
                    "messageType": "error",
                    "date": new Date().toISOString(),
                    "message": message,
                    "category": category
                });
                break;
            default:
                break;
        }
    }
}
// << trace-create-custom-writer

@Component({
    moduleId: module.id,
    templateUrl: "./custom-tracewriter-example.component.html",
    styleUrls: ["./style.css"]
})
export class CustomTraceWriterExampleComponent {
    public customwriter: TimestampConsoleWriter;

    constructor() {
        disable();
        // >> trace-add-custom-writer
        setCategories(categories.Navigation);
        enable();
        this.customwriter = new TimestampConsoleWriter();
        clearWriters();
        addWriter(this.customwriter);
        // << trace-add-custom-writer
    }
}
