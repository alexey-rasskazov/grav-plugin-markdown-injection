
document.addEventListener("DOMContentLoaded", function() {
    
	if (typeof variables === 'undefined') return;
    var tokens = typeof injection_tokens === 'undefined' ? { start: '{{{ ', stop: ' }}}' } : injection_tokens;
	
	activateEscapedHtml();
    fillDefaultValues();
	
    var inputs = document.querySelectorAll('input[data-var]');
    for (let el of inputs) {
        el.addEventListener('input', function(event) {
            el.setAttribute('size', el.value.length);
            updateValue(el);
        });
        el.setAttribute('size', el.value.length);
        el.setAttribute('type',  'text');
        el.setAttribute('autocomplete', 'off');
    }
    
    function activateEscapedHtml() {
        var preCodes = document.querySelectorAll('code');
        for (let code of preCodes) {
            let text = code.textContent;
            let html = '';
            let last = 0;
            let pos;
            while ((pos = text.indexOf(tokens.start, last)) != -1) {
                if (pos > last) {
                    html += escapeHtml(text.substr(last, pos - last));
                }
                pos += tokens.start.length
                last = text.indexOf(tokens.stop, pos);
                if (last == -1) {
                    last = text.length;
                }
                html += '<span data-var="' + text.substr(pos, last - pos) + '"></span>';
                last += tokens.stop.length;
            }
            if (last < text.length) {
                html += escapeHtml(text.substr(last));
            }
            code.innerHTML = html;
        }
    }

    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function fillDefaultValues() {
        for (let name in variables) {
            if (variables.hasOwnProperty(name)) {
                fillValues('[data-var="' + name + '"]', variables[name]);
            }
        }
    }

    function updateValue(input) {
        var name = input.getAttribute('data-var');
        var value = variables[name];
        if (value) {
            fillValues('span[data-var="' + name +'"]', input.value);
        }
    }

    function fillValues(selector, value) {
        let elements = document.querySelectorAll(selector);
        for (let elem of elements) {
            if (elem.tagName === 'INPUT') {
                elem.value = value;   
            } else {
                elem.innerText = value;
            }
        }
    }
}, true);
