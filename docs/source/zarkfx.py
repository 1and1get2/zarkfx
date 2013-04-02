from sphinx.directives import Directive, directives, addnodes
import cgi

class Directive_ZarkFX(Directive):
    has_content = True
    option_spec = {
            "script": directives.flag,
            "demo": directives.flag,
            }

    def run(self):
        if self.options.has_key("script"):
            res = addnodes.nodes.raw( text=u"\n".join(self.content) )
            res.attributes["format"] = "html"
            return [res]
        elif self.options.has_key("demo"):
            text = cgi.escape( u"\n".join(self.content) )
            text = '<textarea fx="fxdemo elastic" autocomplete="off" >' + text + '</textarea>'
            res = addnodes.nodes.raw(text=text)
            res.attributes["format"] = "html"
            return [res]
        else:
            return []

def setup(app):
    app.add_directive("zarkfx", Directive_ZarkFX)
    app.add_javascript("zarkfx.js")
