

class ActiveEffect extends HTMLElement {
    constructor(htmlContent, duration) {
        // create a template
        this.template = document.createElement('template');
        // set the html payload
        if (htmlContent) {
        this.setHTMLContent(htmlContent);
        }
        // set the duration
        if (duration) {
            this.duration = duration;
        }
    }
}