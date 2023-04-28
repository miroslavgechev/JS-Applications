export function htmlGenerator(tagName, parent, className, textContent, href, src) {

    let el = document.createElement(tagName);
    el.textContent = textContent;

    if (parent) {
        parent.appendChild(el);
    }

    if (className) {
        el.classList.add(className);
    }

    if (href) {
        el.setAttribute('href', href);
    }

    if (src) {
        el.setAttribute('src', src);
    }

    return el;
}
