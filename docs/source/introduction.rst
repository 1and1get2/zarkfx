什么是ZarkFX
============

ZarkFX是 `Sparker5 <http://sparker5.com>`_ 团队在实际工作经验中总结出来的一套前端js库。

为你的项目加入ZarkFX
--------------------

使用ZarkFX只需要加载jquery以及zarkfx.js两个js文件即可，无需其它步骤，比如可在head标签中加入下面的两行(仅为测试，勿用于正式项目):

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript" charset="UTF-8"></script>

<script src="http://zarkfx.com/_static/zarkfx.js" type="text/javascript" charset="UTF-8"></script>

简单示例
--------

加载zarkfx.js后，就可以使用ZarkFX了，假设你想为你的网站增加“滚动到顶部”的功能，那么只需加入下面这句html代码即可：

<div fx="scroll[style=default;speed=500;alwaysVisiable;]"></div>

然后试一下点击右下角的滚动按钮吧



再比如你想让几张图片在同一个位置淡入淡出轮流显示，那么只需像下面这样即可:

<div fx="cycle[fx=fade;timeout=100;]">

    <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />

    <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />

    <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />

</div>

下载 Download
-------------

到github下载完整版: `github:ZarkFX <http://github.com/sdjl/zarkfx>`_


使用ZarkFX需要懂得js与css吗?
-------------------------------

完全不需要。

从表面上看，ZarkFX与其它js库最大的区别恐怕就是调用方式上的不同。正如你所见，我们是通过给html元素添加fx属性来实现js效果的，这就是使用ZarkFX的唯一方式。

您不需要懂得任何编程知识，仅需查阅ZarkFX的文档了解有哪些fx可用，然后把fx名称以及参数按如上的格式写入html代码中即可。

ZarkFX的一个目标在于，汇集网络上流行的各个常用js库，然后把它们的调用方式(接口)统一为ZarkFX自己的方式，让不懂技术的和懂技术的都可以通过简单查阅ZarkFX的示例和文档就可以轻松快捷的实现那些常用的js行为。

而ZarkFX并不规定网页的样式，因此无论你的网站如何设计，只要在行为(交互)上有那些常见的需求，就可以用ZarkFX来减少开发人力成本，让你快速、轻松地实现交互效果。

因此，虽然使用ZarkFX本身并不需要懂得css，但这不代表你可以摆脱设计和写css的工作。相反，你需要另外完成这些工作，ZarkFX不是让你变得懒得设计，而是让你的设计快速变现。

如果你恰好不懂得设计，也不会写css，那么 `Bootstrap <http://twitter.github.com/bootstrap/>`_ 也许可以帮到你


我现在可以把ZarkFX用于实际项目中吗?
-----------------------------------

可以，自从我们Sparker5编写出ZarkFX以来到第一次对外公布，我们自己已经用了一年半的时间了，并成功用于好几个网站。自ZarkFX诞生的第一天起，我们不断改进和修复了许多地方，并通过实际运用检测了ZarkFX的可用性和稳定性。

但是，因为这还是一个新兴的项目，我们不保证ZarkFX的下一个版本能够兼容以前的版本。也就是说，如果你使用了当前版本的ZarkFX，那么当我们发布新版本时，如果你想切换为新版本，那么可能会稍微修改一下你项目中的某些调用参数名，或者是其它调用配置。

当然，我们会尽力做好兼容性 :)


使用ZarkFX的语法
-----------------

使用fx很简单，给相应的html元素加上fx属性即可，但它也有一定的语法规则，大概如下:

1、每个fx由fx名后紧跟参数组成，参数包含在一对"[]"符号中，当"[]"中不需要填写任何参数值时，"[]"可以不写。

2、"[]"中的参数列表可以有多个参数，每个参数之间用“;”符号分割，每个参数又由参数名与参数值组成，用“=”符号表示他们的关系。比如: fx="abc[d=e;f=g;]"。

3、参数列表中的"["、"]"、"="、";"以及"&"符号都有特殊含义，当你需要使用它们本身的含义时，你可以用"&"来转义。比如: fx="abc[d=e&];f=g&&;]"，这里参数d的值为"e]"，而参数f的值为"g&"。

4、通常，为了代码好看，参数与参数之间可以插入空格，但是不能插入其它空白符。

5、对同一个html元素，可以使用多个fx，用空格分割，同一种fx也可同时使用在同一个元素上。比如：fx="abc[d=e] fgh[i=j] abc[d=k]"。

6、当参数值为"true"时可以省略"=true"部分，比如：abc[def] 和 abc[def=true] 是一样的。


协议
----

ZarkFX使用 `GPL协议 <http://www.gnu.org/licenses/gpl.html>`_ 发布。


然后
--------

如果你想进一步了解ZarkFX的设计理念，那么可以看看 `ZarkFX的设计思想与目标 </target.html>`_

或者看看 `fx 列表 </fx_list.html>`_ ，立即为你的项目寻找可以使用的fx吧
