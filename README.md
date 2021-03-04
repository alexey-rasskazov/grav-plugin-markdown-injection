# Markdown Injection Plugin

The **Markdown Injection** Plugin is an extension for [Grav CMS](http://github.com/getgrav/grav). Allows to inject variables into the page markdown

## Installation

### Manual Installation

To install the plugin manually, download the zip-version of this repository and unzip it under `/your/site/grav/user/plugins`. Then rename the folder to `markdown-injection`. You can find these files on [GitHub](https://github.com/alexey-rasskazov/grav-plugin-markdown-injection).

You should now have all the plugin files under

    /your/site/grav/user/plugins/markdown-injection

## Configuration

Before configuring this plugin, you should copy the `user/plugins/markdown-injection/markdown-injection.yaml` to `user/config/plugins/markdown-injection.yaml` and only edit that copy.

Here is the default configuration and an explanation of available options:

```yaml
enabled: true
```

Note that if you use the Admin Plugin, a file with your configuration named markdown-injection.yaml will be saved in the `user/config/plugins/`-folder once the configuration is saved in the Admin.

## Usage

In order to define variables on your page add script tag:

```html
<script>
var variables = {
    "name1": "value1",
    "name2": "value2"
}
</script>
```
Then you can use these variables in you markdown code

```
Variable 1 value is {{{ name1 }}}, Variable 2 value is {{{ name2 }}}
```

### Binding variables to input fields

There is a way to bind variable and input tag. Bound variables will be dynamically updated with user input.

```html
You can change variable here: <input data-var="name1" autocomplete="off">
and watch it's changing here {{{ name1 }}}
```
