// 本文件由 tools/convert_javaweb.py 自动生成,请勿手工编辑。
// 数据来源: javaweb-final-exam/exam.md + answers.md(简版解析见 tools/javaweb_briefs.json)
window.QUIZ_QUESTIONS = [
  {
    "id": 1,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`<br>`标签是一个空标签(自闭合标签)。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:HTML 空标签 — <br> 没有结束标签;常见空标签还有 <img>、<input>、<hr>。"
    }
  },
  {
    "id": 2,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML5的DOCTYPE声明是 `<!DOCTYPE html5>`。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:HTML5 的 DOCTYPE — 只写 <!DOCTYPE html>,不区分大小写、不带版本号。"
    }
  },
  {
    "id": 3,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中的通配符选择器是 `*`，可以选择页面中所有元素。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:CSS 通配符选择器 — `*` 匹配页面所有元素,常用于清除默认边距。"
    }
  },
  {
    "id": 4,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，类选择器的优先级高于ID选择器。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:选择器优先级 — ID(#) > 类(.) > 元素;ID 并不是更低。"
    }
  },
  {
    "id": 5,
    "type": "判断题",
    "points": 0.5,
    "question": "在HTML中，`<ul>`标签用于创建有序列表。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:列表标签 — <ul> 是无序列表,<ol> 才是有序列表。"
    }
  },
  {
    "id": 6,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，var声明的变量具有块级作用域。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:var 的作用域 — var 是函数作用域且有变量提升;块级作用域要 let/const。"
    }
  },
  {
    "id": 7,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，null的类型是\"null\"。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:typeof null — 返回 \"object\",是 JS 的历史遗留 bug,null 不是 \"null\" 类型。"
    }
  },
  {
    "id": 8,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS的display:none会使元素不可见但仍占据页面空间。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:display:none 与 visibility:hidden — 前者不占空间,后者不可见但仍占位。"
    }
  },
  {
    "id": 9,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，byte类型占1个字节，取值范围是-128到127。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:byte 类型 — 占 1 字节,取值范围 -128 ~ 127。"
    }
  },
  {
    "id": 10,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，int和long进行运算时，结果类型会自动提升为int。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:类型提升 — int 与 long 运算结果提升为 long,不是 int。"
    }
  },
  {
    "id": 11,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，数组的length是方法，调用时需要加括号。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:数组的 length — 是属性不是方法,不加括号;String 的 length() 才是方法。"
    }
  },
  {
    "id": 12,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，switch语句支持String类型(Java 7及以上)。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:switch 支持 String — Java 7 起可用,case 值不能为 null。"
    }
  },
  {
    "id": 13,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，if-else if-else结构中，可以有多个条件同时成立并执行。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:if-else if 互斥性 — 多分支只会命中并执行第一个满足条件的分支。"
    }
  },
  {
    "id": 14,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，构造方法名必须与类名完全相同。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:构造方法 — 与类名同名、无返回值类型,用于初始化对象。"
    }
  },
  {
    "id": 15,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，this关键字可以在静态方法中使用。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:this 的归属 — this 代表当前实例,静态方法属于类,没有 this。"
    }
  },
  {
    "id": 16,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，一个类可以继承多个类。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:Java 单继承 — 一个类只能 extends 一个父类,但可实现多个接口。"
    }
  },
  {
    "id": 17,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，final修饰的变量值一旦赋值就不能修改。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:final 变量 — 只能赋值一次,之后不可修改(常量)。"
    }
  },
  {
    "id": 18,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，抽象类不能实例化，但可以有构造方法。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:抽象类 — 不能实例化,但有构造方法供子类通过 super() 调用。"
    }
  },
  {
    "id": 19,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，接口的所有方法默认都是public abstract的。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:接口方法默认修饰符 — public abstract;Java 8 后才允许 default/static 方法。"
    }
  },
  {
    "id": 20,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，一个类可以实现多个接口。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:实现多接口 — 类可实现多个接口(implements A, B),与单继承不冲突。"
    }
  },
  {
    "id": 21,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，`String s = new String(\"abc\")`会创建1个String对象。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:new String(\"abc\") — 创建 2 个对象:常量池中的 \"abc\" + 堆中的新 String。"
    }
  },
  {
    "id": 22,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`<meta charset=\"UTF-8\">`应在`<head>`中设置。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:meta charset — 字符编码声明应放在 <head> 内,尽量靠前避免乱码。"
    }
  },
  {
    "id": 23,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，`margin: 0 auto`可以使没有设置宽度的块级元素水平居中。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:margin:0 auto — 水平居中的前提是元素已设置宽度,没有宽度无法居中。"
    }
  },
  {
    "id": 24,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，`===`运算符比较值时不会进行类型转换。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:=== 严格相等 — 不做类型转换,类型不同直接 false;== 会隐式转换。"
    }
  },
  {
    "id": 25,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，do-while循环至少会执行一次循环体。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:do-while — 先执行一次循环体再判断条件,至少执行一次。"
    }
  },
  {
    "id": 26,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，continue关键字会结束整个循环。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:continue 与 break — continue 跳过本次循环继续下一次;break 才结束整个循环。"
    }
  },
  {
    "id": 27,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，`position:relative`的元素相对于其最近的定位祖先元素定位。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:position:relative — 相对自身原来的位置偏移;相对定位祖先的是 absolute。"
    }
  },
  {
    "id": 28,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，方法重写(Override)可以改变方法的参数列表。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:重写(Override) — 方法签名必须与父类相同;改参数列表是重载不是重写。"
    }
  },
  {
    "id": 29,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，Object类是所有类的父类(基类)。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:Object 根类 — Java 所有类都直接或间接继承 Object。"
    }
  },
  {
    "id": 30,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`target=\"_blank\"`使超链接在当前窗口打开。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:target 属性 — _blank 新窗口打开,_self 才是当前窗口(默认值)。"
    }
  },
  {
    "id": 31,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，标识符可以以数字开头。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:标识符规则 — 可以字母、_、$ 开头,不能以数字开头。"
    }
  },
  {
    "id": 32,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，方法重载与返回值类型有关，返回值类型不同就可以构成重载。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:重载(Overload) — 只看参数列表是否不同,与返回值类型无关。"
    }
  },
  {
    "id": 33,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS的`border-radius`属性可以设置圆角边框。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:border-radius — 设置圆角边框,可分别指定四个角。"
    }
  },
  {
    "id": 34,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，instanceof运算符返回boolean类型的结果。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:instanceof — 二元运算符,返回 boolean,判断对象是否属于某类型。"
    }
  },
  {
    "id": 35,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，BOM的核心对象是document。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:BOM 与 DOM — BOM 核心是 window;document 是 DOM 的核心对象。"
    }
  },
  {
    "id": 36,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，import语句必须放在package语句之前。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:语句顺序 — package → import → 类定义,package 必须在最前。"
    }
  },
  {
    "id": 37,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`<td>`的colspan属性用于合并列(水平合并)。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:表格合并 — colspan 水平合并列,rowspan 垂直合并行。"
    }
  },
  {
    "id": 38,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，static方法可以直接访问类的非静态成员变量。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:static 限制 — 静态方法属于类,不能直接访问非静态(实例)成员。"
    }
  },
  {
    "id": 39,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，优先级最高的选择器是!important标记的样式。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:!important — 优先级最高,可覆盖行内样式(教材口径)。"
    }
  },
  {
    "id": 40,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，抽象方法可以有方法体。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:抽象方法 — 只有声明没有方法体,强制子类实现。"
    }
  },
  {
    "id": 41,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，`typeof NaN`返回\"number\"。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:typeof NaN — 返回 \"number\",NaN 是数值类型的特殊值(Not a Number)。"
    }
  },
  {
    "id": 42,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，所有类必须定义在包(package)中，否则编译错误。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:默认包 — 类可以不属于任何包(默认包),不会编译错误,只是不推荐。"
    }
  },
  {
    "id": 43,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，padding属性设置的是元素的外边距。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:padding 与 margin — padding 内边距,margin 外边距,别混。"
    }
  },
  {
    "id": 44,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，int类型的默认值是0。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:成员变量默认值 — int 默认 0,boolean 默认 false,引用类型默认 null。"
    }
  },
  {
    "id": 45,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`<img>`标签的alt属性是必填属性。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:img 的 alt — 图片无法显示时展示替代文本,也是无障碍访问的保障。"
    }
  },
  {
    "id": 46,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，数组创建后可以动态改变其长度。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:数组长度 — 创建后固定不可变;需要可变长度用集合(如 ArrayList)。"
    }
  },
  {
    "id": 47,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，undefined和null是完全相同的值。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:undefined 与 null — 语义不同:未赋值 vs 空引用;== 为 true 但 === 为 false。"
    }
  },
  {
    "id": 48,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，接口可以包含成员变量，默认是public static final的。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:接口成员变量 — 默认 public static final,即常量,必须初始化。"
    }
  },
  {
    "id": 49,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`<form>`的action属性指定表单数据的提交方式。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:form 属性 — action 指定提交到的地址,method 才指定提交方式(get/post)。"
    }
  },
  {
    "id": 50,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，`position:fixed`相对于浏览器视口定位。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:position:fixed — 相对浏览器视口定位,滚动不随页面移动。"
    }
  },
  {
    "id": 51,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，long类型占8个字节。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:long 类型 — 占 8 字节,字面量结尾加 L。"
    }
  },
  {
    "id": 52,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，const声明的变量的值绝对不能改变。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:const 的边界 — 绑定不可重新赋值,但对象的属性、数组元素仍可修改。"
    }
  },
  {
    "id": 53,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，方法返回值类型为void时，可以省略return语句。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:void 方法 — 可以省略 return,或只写 return; 提前结束。"
    }
  },
  {
    "id": 54,
    "type": "判断题",
    "points": 0.5,
    "question": "HTML中，`<video>`标签的autoplay属性用于自动播放视频。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:video autoplay — 自动播放属性;通常配合 muted 才能被浏览器允许。"
    }
  },
  {
    "id": 55,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，接口可以继承另一个接口，使用extends关键字。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:接口继承接口 — 用 extends,且可以多继承;类实现接口用 implements。"
    }
  },
  {
    "id": 56,
    "type": "判断题",
    "points": 0.5,
    "question": "CSS中，`font-size`属性用于设置文字大小。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:font-size — 设置文字大小,常用 px/em/rem 单位。"
    }
  },
  {
    "id": 57,
    "type": "判断题",
    "points": 0.5,
    "question": "在Java中，静态方法可以通过对象名调用，也可以通过类名调用。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:静态方法调用 — 类名调用(推荐)与对象名调用都合法。"
    }
  },
  {
    "id": 58,
    "type": "判断题",
    "points": 0.5,
    "question": "JavaScript中，let声明的变量在声明前可以访问(变量提升)。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:let 无变量提升 — 声明前访问进入暂时性死区报错;var 才会提升为 undefined。"
    }
  },
  {
    "id": 59,
    "type": "判断题",
    "points": 0.5,
    "question": "Java中，main方法的参数名必须是args。（ ）",
    "answer": "错",
    "analysis": {
      "brief": "考点:main 参数名 — 只有签名 public static void main(String[]) 固定,参数名可任取。"
    }
  },
  {
    "id": 60,
    "type": "判断题",
    "points": 0.5,
    "question": "在HTML中，`<head>`标签中通常包含`<title>`、`<meta>`、`<link>`等标签。（ ）",
    "answer": "对",
    "analysis": {
      "brief": "考点:head 内常用标签 — <title>、<meta>、<link>、<style> 等,内容不直接显示。"
    }
  },
  {
    "id": 61,
    "type": "单选题",
    "points": 0.5,
    "question": "下列哪个DOCTYPE声明用于HTML5？（ ）",
    "options": [
      "A. `<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">`",
      "B. `<!DOCTYPE html>`",
      "C. `<!DOCTYPE HTML5>`",
      "D. `<!DOCTYPE html5>`"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:HTML5 DOCTYPE — 标准写法 <!DOCTYPE html>;带 PUBLIC DTD 的是 HTML4。"
    }
  },
  {
    "id": 62,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个标签不属于HTML文档的基本结构？（ ）",
    "options": [
      "A. `<html>`",
      "B. `<head>`",
      "C. `<body>`",
      "D. `<title>`"
    ],
    "answer": "D",
    "analysis": {
      "brief": "考点:文档基本结构 — html/head/body 三层;<title> 是 head 内部的子标签。"
    }
  },
  {
    "id": 63,
    "type": "单选题",
    "points": 0.5,
    "question": "在HTML中，单行注释的写法是（ ）",
    "options": [
      "A. `// 注释内容`",
      "B. `/* 注释内容 */`",
      "C. `<!-- 注释内容 -->`",
      "D. `# 注释内容`"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:HTML 注释 — 语法 <!-- 注释内容 -->,浏览器不渲染。"
    }
  },
  {
    "id": 64,
    "type": "单选题",
    "points": 0.5,
    "question": "HTML标签的属性通常写在（ ）",
    "options": [
      "A. 起始标签中",
      "B. 结束标签中",
      "C. 标签内容中",
      "D. 任意位置"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:属性位置 — 属性写在起始标签内,格式 属性名=\"值\"。"
    }
  },
  {
    "id": 65,
    "type": "单选题",
    "points": 0.5,
    "question": "关于HTML中`<h1>`~`<h6>`标题标签，下列说法正确的是（ ）",
    "options": [
      "A. `<h6>`字体最大",
      "B. `<h1>`字体最大",
      "C. 所有标题字号相同",
      "D. `<h4>`比`<h3>`更重要"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:标题层级 — <h1> 最大、<h6> 最小,按重要性递减。"
    }
  },
  {
    "id": 66,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个标签用于创建无序列表？（ ）",
    "options": [
      "A. `<ol>`",
      "B. `<dl>`",
      "C. `<ul>`",
      "D. `<list>`"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:ul/ol/dl — ul 无序列表、ol 有序列表、dl 定义列表;没有 <list> 标签。"
    }
  },
  {
    "id": 67,
    "type": "单选题",
    "points": 0.5,
    "question": "在HTML中，`<div>`标签是（ ）",
    "options": [
      "A. 行内元素",
      "B. 行内块元素",
      "C. 块级元素",
      "D. 空元素"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:div — 块级元素,独占一行,常作布局容器。"
    }
  },
  {
    "id": 68,
    "type": "单选题",
    "points": 0.5,
    "question": "在HTML中，`<span>`标签默认是（ ）",
    "options": [
      "A. 块级元素",
      "B. 行内元素",
      "C. 行内块元素",
      "D. 替换元素"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:span — 行内元素,不换行,常作文字片段容器。"
    }
  },
  {
    "id": 69,
    "type": "单选题",
    "points": 0.5,
    "question": "HTML中，td标签的rowspan属性用于（ ）",
    "options": [
      "A. 合并列",
      "B. 合并行",
      "C. 设置单元格宽度",
      "D. 设置单元格高度"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:rowspan/colspan — rowspan 合并行(跨行),colspan 合并列(跨列)。"
    }
  },
  {
    "id": 70,
    "type": "单选题",
    "points": 0.5,
    "question": "在HTML表单中，以下哪个input type用于上传文件？（ ）",
    "options": [
      "A. text",
      "B. submit",
      "C. file",
      "D. reset"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:input type=file — 上传文件控件,form 需配合 enctype=multipart/form-data。"
    }
  },
  {
    "id": 71,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个input类型用于创建复选框？（ ）",
    "options": [
      "A. radio",
      "B. checkbox",
      "C. select",
      "D. button"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:radio 与 checkbox — checkbox 复选框可多选,radio 单选同组互斥。"
    }
  },
  {
    "id": 72,
    "type": "单选题",
    "points": 0.5,
    "question": "在HTML中，让超链接在新窗口中打开的属性值是（ ）",
    "options": [
      "A. `_self`",
      "B. `_blank`",
      "C. `_top`",
      "D. `_parent`"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:target=_blank — 在新窗口/新标签页打开链接。"
    }
  },
  {
    "id": 73,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个属性用于让HTML5视频自动播放？（ ）",
    "options": [
      "A. controls",
      "B. loop",
      "C. autoplay",
      "D. muted"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:video autoplay — 自动播放;controls 显示控件、loop 循环、muted 静音。"
    }
  },
  {
    "id": 74,
    "type": "单选题",
    "points": 0.5,
    "question": "关于HTML的`<video>`标签，controls属性的作用是（ ）",
    "options": [
      "A. 自动播放",
      "B. 循环播放",
      "C. 显示播放控件",
      "D. 静音播放"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:video controls — 显示播放/暂停、进度条等控件条。"
    }
  },
  {
    "id": 75,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪种方式将CSS样式直接写在HTML标签的style属性中？（ ）",
    "options": [
      "A. 外部样式表",
      "B. 内部样式表",
      "C. 内联样式",
      "D. 导入样式"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:CSS 三种引入 — style 属性是内联样式;<style> 内部样式表;<link> 外部样式表。"
    }
  },
  {
    "id": 76,
    "type": "单选题",
    "points": 0.5,
    "question": "以下CSS选择器中，优先级最高的是（ ）",
    "options": [
      "A. 元素选择器",
      "B. 类选择器",
      "C. ID选择器",
      "D. 通配符选择器"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:选择器优先级 — ID > 类 > 元素 > 通配符(不含 !important 与行内样式)。"
    }
  },
  {
    "id": 77,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个是CSS类选择器的正确语法？（ ）",
    "options": [
      "A. `.class { color: red; }`",
      "B. `#class { color: red; }`",
      "C. `*class { color: red; }`",
      "D. `class { color: red; }`"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:类选择器语法 — `.类名`;# 是 ID 选择器,* 是通配符。"
    }
  },
  {
    "id": 78,
    "type": "单选题",
    "points": 0.5,
    "question": "关于CSS选择器优先级，下列说法正确的是（ ）",
    "options": [
      "A. !important > 行内样式 > ID选择器 > 类选择器 > 元素选择器",
      "B. 行内样式 > !important > ID选择器 > 类选择器 > 元素选择器",
      "C. 元素选择器 > 类选择器 > ID选择器",
      "D. 类选择器 > ID选择器 > 行内样式"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:优先级完整链 — !important > 行内样式 > ID > 类 > 元素。"
    }
  },
  {
    "id": 79,
    "type": "单选题",
    "points": 0.5,
    "question": "下列CSS代码中，哪一项可将段落文字颜色设为红色？（ ）",
    "options": [
      "A. `p { color: red; }`",
      "B. `p { font-color: red; }`",
      "C. `p { text-color: red; }`",
      "D. `p { background: red; }`"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:文字颜色属性 — color;没有 font-color/text-color 这两个属性。"
    }
  },
  {
    "id": 80,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个CSS属性的值是 transparent？（ ）",
    "options": [
      "A. color",
      "B. background-color",
      "C. font-size",
      "D. font-weight"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:transparent — 用于颜色值属性,最常见是 background-color:transparent 透明背景。"
    }
  },
  {
    "id": 81,
    "type": "单选题",
    "points": 0.5,
    "question": "有CSS代码：`margin: 10px 20px;` 表示上下外边距为10px，左右外边距为（ ）",
    "options": [
      "A. 10px",
      "B. 20px",
      "C. 15px",
      "D. 30px"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:margin 缩写 — 两个值时:上下 | 左右,即上下 10px、左右 20px。"
    }
  },
  {
    "id": 82,
    "type": "单选题",
    "points": 0.5,
    "question": "以下代码的输出结果是（ ）HTML: `<div style=\"display: none;\">Hello</div>` 渲染结果中该元素（ ）",
    "options": [
      "A. 元素不可见但占据空间",
      "B. 元素不可见且不占空间",
      "C. 元素透明度变为0",
      "D. 元素被隐藏但可点击"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:display:none — 元素不渲染且不占空间;visibility:hidden 占空间,opacity:0 透明但仍占位。"
    }
  },
  {
    "id": 83,
    "type": "单选题",
    "points": 0.5,
    "question": "以下代码中，最终div的宽度为多少？（ ）`div { width: 200px; padding: 10px; border: 2px solid black; }`（box-sizing: content-box）",
    "options": [
      "A. 200px",
      "B. 220px",
      "C. 224px",
      "D. 212px"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:盒模型计算(content-box) — 实际宽度 = width + padding + border = 200 + 20 + 4 = 224px。"
    }
  },
  {
    "id": 84,
    "type": "单选题",
    "points": 0.5,
    "question": "以下CSS代码中，哪个属性用于设置元素的圆角边框？（ ）",
    "options": [
      "A. border-style",
      "B. border-radius",
      "C. border-corner",
      "D. round-corner"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:border-radius — 圆角边框属性;没有 border-corner 这种写法。"
    }
  },
  {
    "id": 85,
    "type": "单选题",
    "points": 0.5,
    "question": "关于CSS的position:absolute，下列说法正确的是（ ）",
    "options": [
      "A. 相对于视口定位",
      "B. 相对于最近的非static定位祖先元素定位",
      "C. 相对于最近的行内元素定位",
      "D. 相对于父元素定位"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:position:absolute — 相对最近的非 static 定位祖先定位;没有定位祖先则相对文档。"
    }
  },
  {
    "id": 86,
    "type": "单选题",
    "points": 0.5,
    "question": "有CSS代码：`display: flex;` 这个属性用于（ ）",
    "options": [
      "A. 创建弹性盒子(Flexbox)布局",
      "B. 隐藏元素",
      "C. 创建网格布局",
      "D. 设置元素为内联元素"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:display:flex — 开启 Flexbox 弹性布局,子元素可方便地排列与分配空间。"
    }
  },
  {
    "id": 87,
    "type": "单选题",
    "points": 0.5,
    "question": "在JavaScript中，以下哪个关键字声明的变量具有块级作用域？（ ）",
    "options": [
      "A. var",
      "B. let",
      "C. const",
      "D. function"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:块级作用域 — let/const 都有,单选按教材选 let;var 是函数作用域。"
    }
  },
  {
    "id": 88,
    "type": "单选题",
    "points": 0.5,
    "question": "以下JavaScript代码的输出结果是（ ）`console.log(typeof 42);`",
    "options": [
      "A. number",
      "B. Number",
      "C. int",
      "D. integer"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:typeof — 42 是 number 类型,返回小写字符串 \"number\"。"
    }
  },
  {
    "id": 89,
    "type": "单选题",
    "points": 0.5,
    "question": "以下JavaScript代码的输出结果是（ ）`console.log(5 == \"5\");`",
    "options": [
      "A. true",
      "B. false",
      "C. TypeError",
      "D. undefined"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:== 隐式转换 — \"5\" 被转成数字 5 再比较,5 == \"5\" 为 true;=== 才为 false。"
    }
  },
  {
    "id": 90,
    "type": "单选题",
    "points": 0.5,
    "question": "以下JavaScript代码的输出结果是（ ）`let x = 10; if (x > 5) { console.log(\"A\"); } else { console.log(\"B\"); }`",
    "options": [
      "A. A",
      "B. B",
      "C. undefined",
      "D. 报错"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:if-else 分支 — 10 > 5 成立,执行 if 分支输出 A。"
    }
  },
  {
    "id": 91,
    "type": "单选题",
    "points": 0.5,
    "question": "以下JavaScript代码的输出结果是（ ）`let i = 0; while (i < 3) { console.log(i); i++; }`",
    "options": [
      "A. 0 1 2",
      "B. 1 2 3",
      "C. 0 1 2 3",
      "D. 无限循环"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:while 循环 — i 从 0 到 2 共输出 0 1 2,循环结束 i 为 3。"
    }
  },
  {
    "id": 92,
    "type": "单选题",
    "points": 0.5,
    "question": "以下JavaScript代码的输出结果是（ ）`for (let i = 0; i < 5; i++) { if (i === 3) break; console.log(i); }`",
    "options": [
      "A. 0 1 2",
      "B. 0 1 2 3",
      "C. 0 1 2 3 4",
      "D. 0 1"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:break — i 等于 3 时跳出循环,只输出 0 1 2。"
    }
  },
  {
    "id": 93,
    "type": "单选题",
    "points": 0.5,
    "question": "在JavaScript中，以下哪种方式能选中id为\"demo\"的元素？（ ）",
    "options": [
      "A. `document.getElementById(\"demo\")`",
      "B. `document.getElementByClass(\"demo\")`",
      "C. `document.querySelectorAll(\"#demo\")`",
      "D. `document.getElementsByTagName(\"demo\")`"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:DOM 获取元素 — getElementById 返回单个元素;querySelectorAll 返回集合还需取下标。"
    }
  },
  {
    "id": 94,
    "type": "单选题",
    "points": 0.5,
    "question": "在JavaScript中，BOM的核心对象是（ ）",
    "options": [
      "A. document",
      "B. window",
      "C. navigator",
      "D. location"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:BOM 核心 — window 是浏览器对象模型的顶层对象,其余(navigator/location 等)都是其属性。"
    }
  },
  {
    "id": 95,
    "type": "单选题",
    "points": 0.5,
    "question": "以下JavaScript代码的输出结果是（ ）`let a = 1; switch (a) { case 1: console.log(\"X\"); break; case 2: console.log(\"Y\"); break; default: console.log(\"Z\"); }`",
    "options": [
      "A. X",
      "B. Y",
      "C. Z",
      "D. XY"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:switch + break — 命中 case 1 输出 X 后 break,不再继续执行后面的分支。"
    }
  },
  {
    "id": 96,
    "type": "单选题",
    "points": 0.5,
    "question": "\"Java之父\"是（ ）",
    "options": [
      "A. Bjarne Stroustrup",
      "B. James Gosling",
      "C. Dennis Ritchie",
      "D. Tim Berners-Lee"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:Java 之父 — James Gosling;Bjarne Stroustrup 是 C++,Dennis Ritchie 是 C。"
    }
  },
  {
    "id": 97,
    "type": "单选题",
    "points": 0.5,
    "question": "JDK中，用于编译Java源文件的命令是（ ）",
    "options": [
      "A. java",
      "B. javac",
      "C. jdb",
      "D. javadoc"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:javac 与 java — javac 编译源码为字节码,java 运行字节码。"
    }
  },
  {
    "id": 98,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪个目录不属于JDK的bin目录下的可执行工具？（ ）",
    "options": [
      "A. javac",
      "B. java",
      "C. javadoc",
      "D. jvm"
    ],
    "answer": "D",
    "analysis": {
      "brief": "考点:JDK 工具 — bin 下有 javac/java/javadoc 等;jvm 是虚拟机概念,不是可执行工具。"
    }
  },
  {
    "id": 99,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，main方法的方法签名必须为（ ）",
    "options": [
      "A. `public static void main(String[] args)`",
      "B. `public void main(String[] args)`",
      "C. `static void main(String[] args)`",
      "D. `public static int main(String[] args)`"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:main 方法签名 — public static void main(String[] args) 是 JVM 入口约定。"
    }
  },
  {
    "id": 100,
    "type": "单选题",
    "points": 0.5,
    "question": "在IDEA中创建Java项目时，通常用来组织代码的容器称为（ ）",
    "options": [
      "A. 文件夹",
      "B. 包(package)",
      "C. 模块(module)",
      "D. 库(library)"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:包(package) — Java 用包组织类,避免命名冲突,对应目录结构。"
    }
  },
  {
    "id": 101,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，包声明语句package必须位于（ ）",
    "options": [
      "A. 文件的第一行(注释除外)",
      "B. import语句之后",
      "C. 类的内部",
      "D. 方法的开头"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:package 位置 — 必须是源文件第一条有效语句(注释除外)。"
    }
  },
  {
    "id": 102,
    "type": "单选题",
    "points": 0.5,
    "question": "Java中的关键字不能用作（ ）",
    "options": [
      "A. 标识符",
      "B. 注释内容",
      "C. 字符串字面量",
      "D. 程序输出"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:关键字 — 是语言保留字,不能用作标识符(变量名/类名等)。"
    }
  },
  {
    "id": 103,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java命名规范中，类名应使用（ ）",
    "options": [
      "A. 全大写",
      "B. 小写字母加下划线",
      "C. 大驼峰(PascalCase)",
      "D. 小驼峰(camelCase)"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:命名规范 — 类名大驼峰(PascalCase),变量/方法小驼峰(camelCase),常量全大写。"
    }
  },
  {
    "id": 104,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，单行注释的写法是（ ）",
    "options": [
      "A. `// 注释`",
      "B. `/* 注释 */`",
      "C. `# 注释`",
      "D. `<!-- 注释 -->`"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:Java 单行注释 — // 到行尾;HTML 注释才是 <!-- -->。"
    }
  },
  {
    "id": 105,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java多行注释中，以下写法正确的是（ ）",
    "options": [
      "A. `/* 注释内容 */`",
      "B. `// 注释内容 //`",
      "C. `# 注释内容 #`",
      "D. `<!-- 注释内容 -->`"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:Java 多行注释 — /* ... */ 之间内容均被忽略,不可嵌套。"
    }
  },
  {
    "id": 106,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，byte类型占用多少个字节？（ ）",
    "options": [
      "A. 1",
      "B. 2",
      "C. 4",
      "D. 8"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:byte 占用 — 1 字节(8 位);short 2、int 4、long 8。"
    }
  },
  {
    "id": 107,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下代码的输出结果是（ ）`int a = 100; System.out.println(a);`",
    "options": [
      "A. 100",
      "B. a",
      "C. 编译错误",
      "D. 运行时异常"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:变量输出 — println(a) 输出变量当前值 100,不是字母 a。"
    }
  },
  {
    "id": 108,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下哪项是正确的变量声明？（ ）",
    "options": [
      "A. `int 1num = 10;`",
      "B. `int num = 10;`",
      "C. `int num = 10.5;`",
      "D. `int num = \"10\";`"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:合法声明 — int num = 10;整数不能赋小数或字符串;标识符不能数字开头。"
    }
  },
  {
    "id": 109,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`double d = 5.5; int i = (int) d; System.out.println(i);`",
    "options": [
      "A. 5",
      "B. 5.5",
      "C. 6",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:强制类型转换 — (int) 直接截断小数(非四舍五入),5.5 → 5。"
    }
  },
  {
    "id": 110,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int x = 5; x = x + 2; System.out.println(x);`",
    "options": [
      "A. 5",
      "B. 7",
      "C. 52",
      "D. 编译错误"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:复合赋值 — x = x + 2 即 5 + 2 = 7。"
    }
  },
  {
    "id": 111,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下代码的输出结果是（ ）`int a = 10, b = 3; System.out.println(a / b);`",
    "options": [
      "A. 3",
      "B. 3.333",
      "C. 3.0",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:整数除法 — int / int 结果仍是 int,舍去小数:10/3 = 3。"
    }
  },
  {
    "id": 112,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下代码的输出结果是（ ）`int x = 5; System.out.println(x++);`",
    "options": [
      "A. 5",
      "B. 6",
      "C. 4",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:x++ 后置自增 — 表达式先取原值 5,再自增;先自增的 ++x 才输出 6。"
    }
  },
  {
    "id": 113,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下代码的输出结果是（ ）`System.out.println(10 > 5 && 3 < 2);`",
    "options": [
      "A. true",
      "B. false",
      "C. 编译错误",
      "D. 运行时异常"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:逻辑与 && — 10>5 为 true、3<2 为 false,true && false = false。"
    }
  },
  {
    "id": 114,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下代码的输出结果是（ ）`System.out.println(!(10 > 5));`",
    "options": [
      "A. true",
      "B. false",
      "C. 编译错误",
      "D. 运行时异常"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:逻辑非 ! — !true = false。"
    }
  },
  {
    "id": 115,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int a = 3, b = 5; boolean r = (a > b); System.out.println(r);`",
    "options": [
      "A. true",
      "B. false",
      "C. 3",
      "D. 5"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:比较表达式 — 3 > 5 不成立,boolean r = false。"
    }
  },
  {
    "id": 116,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int score = 85; if (score >= 90) { System.out.println(\"A\"); } else if (score >= 80) { System.out.println(\"B\"); } else { System.out.println(\"C\"); }`",
    "options": [
      "A. A",
      "B. B",
      "C. C",
      "D. 编译错误"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:else if 顺序 — 85 不满足 >=90,继续判断满足 >=80,输出 B。"
    }
  },
  {
    "id": 117,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int num = 3; switch (num) { case 1: System.out.println(\"一\"); break; case 2: System.out.println(\"二\"); break; case 3: System.out.println(\"三\"); break; default: System.out.println(\"其他\"); }`",
    "options": [
      "A. 一",
      "B. 二",
      "C. 三",
      "D. 其他"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:switch 匹配 — num=3 命中 case 3 输出 三,break 后结束。"
    }
  },
  {
    "id": 118,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int x = 15; if (x > 10) { System.out.println(\"大\"); } else if (x > 5) { System.out.println(\"中\"); } else { System.out.println(\"小\"); }`",
    "options": [
      "A. 大",
      "B. 中",
      "C. 小",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:多分支命中 — x=15 先满足 x>10,输出 大,后面分支不再判断。"
    }
  },
  {
    "id": 119,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int x = 3; if (x % 2 == 0) { System.out.println(\"偶数\"); } else { System.out.println(\"奇数\"); }`",
    "options": [
      "A. 偶数",
      "B. 奇数",
      "C. 编译错误",
      "D. 无输出"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:奇偶判断 — 3 % 2 = 1 不等于 0,走 else 输出 奇数。"
    }
  },
  {
    "id": 120,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`boolean flag = false; if (flag = true) { System.out.println(\"真\"); } else { System.out.println(\"假\"); }`",
    "options": [
      "A. 真",
      "B. 假",
      "C. 编译错误",
      "D. 运行时异常"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:= 与 == 的坑 — if(flag = true) 是赋值表达式,值为 true,输出 真;条件判断应写 ==。"
    }
  },
  {
    "id": 121,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int sum = 0; for (int i = 1; i <= 3; i++) { sum += i; } System.out.println(sum);`",
    "options": [
      "A. 3",
      "B. 6",
      "C. 10",
      "D. 5"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:循环累加 — 1+2+3 = 6。"
    }
  },
  {
    "id": 122,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int i = 1; while (i < 5) { System.out.print(i); i++; }`",
    "options": [
      "A. 1234",
      "B. 12345",
      "C. 01234",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:while + print — print 不换行,输出连续的 1234。"
    }
  },
  {
    "id": 123,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`for (int i = 1; i <= 5; i++) { if (i == 3) { break; } System.out.print(i); }`",
    "options": [
      "A. 12",
      "B. 123",
      "C. 12345",
      "D. 45"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:break 位置 — i==3 时跳出,只输出 1、2。"
    }
  },
  {
    "id": 124,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int x = 0; while (x < 3) { System.out.print(x); x++; }`",
    "options": [
      "A. 012",
      "B. 123",
      "C. 0123",
      "D. 无限循环"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:while 边界 — x<3,输出 0 1 2。"
    }
  },
  {
    "id": 125,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下关于break和continue的区别，正确的是（ ）",
    "options": [
      "A. break结束当前循环，continue跳过本次循环剩余语句",
      "B. break跳过本次循环，continue结束整个循环",
      "C. break只能用于switch",
      "D. continue只能用于for循环"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:break vs continue — break 结束整个循环;continue 跳过本次剩余语句进入下一次。"
    }
  },
  {
    "id": 126,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`public static int square(int x) { return x * x; }` 调用：`System.out.println(square(5));`",
    "options": [
      "A. 10",
      "B. 25",
      "C. 5",
      "D. 编译错误"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:方法调用 — square(5) 返回 5*5 = 25。"
    }
  },
  {
    "id": 127,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`public static int add(int a, int b) { return a + b; }` `System.out.println(add(7, 8));`",
    "options": [
      "A. 15",
      "B. 78",
      "C. 56",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:方法参数 — add(7, 8) 返回 15;数字相加不是拼接。"
    }
  },
  {
    "id": 128,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下关于方法返回值的说法正确的是（ ）",
    "options": [
      "A. void方法可以有return语句",
      "B. int类型方法可以返回double值",
      "C. 方法只能返回一个值",
      "D. 方法必须有返回值"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:返回值规则 — 一次只能返回一个值;void 方法无需返回值。"
    }
  },
  {
    "id": 129,
    "type": "单选题",
    "points": 0.5,
    "question": "以下哪一组是合法的Java方法重载？（ ）",
    "options": [
      "A. `add(int a, int b)` 和 `add(int x, int y)`",
      "B. `add(int a, int b)` 和 `add(int a, int b, int c)`",
      "C. `add(int a, int b)` 和 `int add(int a, int b)`",
      "D. `add(int a, int b)` 和 `add(double a, int b, int c)`"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:合法重载 — 参数个数不同即构成重载;仅参数名不同(A)、仅返回值不同(C)都不行。"
    }
  },
  {
    "id": 130,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`public static int max(int a, int b) { return a > b ? a : b; }` `System.out.println(max(10, 20));`",
    "options": [
      "A. 10",
      "B. 20",
      "C. true",
      "D. false"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:三元运算符 — a>b ? a : b,10>20 为 false 取 b = 20。"
    }
  },
  {
    "id": 131,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下哪项是正确的数组声明？（ ）",
    "options": [
      "A. `int arr[];`",
      "B. `int[] arr;`",
      "C. 以上两种都可以",
      "D. `arr int[];`"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:数组声明 — int[] arr 与 int arr[] 两种写法均可,推荐前者。"
    }
  },
  {
    "id": 132,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int[] arr = new int[3]; System.out.println(arr[1]);`",
    "options": [
      "A. 0",
      "B. 1",
      "C. null",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:数组默认值 — new int[3] 各元素默认 0,arr[1] 输出 0。"
    }
  },
  {
    "id": 133,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int[] arr = {10, 20, 30}; System.out.println(arr.length);`",
    "options": [
      "A. 3",
      "B. 2",
      "C. 10",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:length 属性 — 数组长度用 arr.length(无括号),此处为 3。"
    }
  },
  {
    "id": 134,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`int[] arr = {1, 2, 3, 4, 5}; int sum = 0; for (int i = 0; i < arr.length; i++) { sum += arr[i]; } System.out.println(sum);`",
    "options": [
      "A. 15",
      "B. 10",
      "C. 5",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:数组遍历求和 — 1+2+3+4+5 = 15。"
    }
  },
  {
    "id": 135,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，关于数组作为引用类型的说法，正确的是（ ）",
    "options": [
      "A. 数组可以赋值给Object变量",
      "B. 数组变量存储的是实际元素的值",
      "C. 数组长度在运行时可以改变",
      "D. 数组变量可以直接使用==比较内容"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:数组是引用类型 — 可赋给 Object 变量;长度固定;== 比较的是地址不是内容。"
    }
  },
  {
    "id": 136,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`class Student { String name; }` `Student s = new Student(); System.out.println(s.name);`",
    "options": [
      "A. null",
      "B. \"\"",
      "C. 0",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:引用成员默认值 — String 成员变量未赋值默认 null,不是空串。"
    }
  },
  {
    "id": 137,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，封装的实现手段主要是（ ）",
    "options": [
      "A. 使用public修饰变量",
      "B. 使用private修饰变量，提供public的getter/setter",
      "C. 使用static修饰变量",
      "D. 使用final修饰变量"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:封装手段 — private 隐藏属性 + public getter/setter 控制访问。"
    }
  },
  {
    "id": 138,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`class Person { String name; Person(String name) { this.name = name; } }` `Person p = new Person(\"张三\"); System.out.println(p.name);`",
    "options": [
      "A. null",
      "B. 张三",
      "C. name",
      "D. 编译错误"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:this 区分成员 — this.name 指成员变量,形参 name 赋给它,输出 张三。"
    }
  },
  {
    "id": 139,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，static关键字不能修饰（ ）",
    "options": [
      "A. 变量",
      "B. 方法",
      "C. 构造方法",
      "D. 代码块"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:static 限制 — 不能修饰构造方法;构造方法属于对象创建过程。"
    }
  },
  {
    "id": 140,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`class Test { static void show() { System.out.println(\"Static\"); } }` `Test.show();`",
    "options": [
      "A. Static",
      "B. show",
      "C. 编译错误",
      "D. 运行时错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:静态方法调用 — 类名直接调用 Test.show(),输出 Static。"
    }
  },
  {
    "id": 141,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`class Dog { void bark() { System.out.println(\"汪汪\"); } }` `Dog d = new Dog(); d.bark();`",
    "options": [
      "A. 汪汪",
      "B. bark",
      "C. 编译错误",
      "D. 运行时错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:实例方法调用 — new 对象后通过引用调用 d.bark()。"
    }
  },
  {
    "id": 142,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`class Value { int x; }` `Value v = new Value(); System.out.println(v.x);`",
    "options": [
      "A. 0",
      "B. null",
      "C. 编译错误",
      "D. 运行时错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:int 成员默认值 — 未赋值的 int 成员变量默认 0。"
    }
  },
  {
    "id": 143,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，以下关于面向对象的说法正确的是（ ）",
    "options": [
      "A. Java是完全面向对象的语言",
      "B. 面向过程比面向对象更适合大型项目",
      "C. 封装、继承、多态是面向对象的三大特征",
      "D. 面向对象不支持代码复用"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:面向对象三大特征 — 封装、继承、多态;Java 因有基本类型并非完全面向对象。"
    }
  },
  {
    "id": 144,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，下列关于super关键字说法错误的是（ ）",
    "options": [
      "A. super可以调用父类的构造方法",
      "B. super可以调用父类的成员变量",
      "C. super可以调用父类的成员方法",
      "D. super可以在静态方法中使用"
    ],
    "answer": "D",
    "analysis": {
      "brief": "考点:super 限制 — 与 this 一样不能出现在静态上下文中,D 是错误说法(选它)。"
    }
  },
  {
    "id": 145,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，类继承的规则是（ ）",
    "options": [
      "A. 一个类可以继承多个类",
      "B. 一个类只能继承一个类",
      "C. 接口可以继承多个类",
      "D. 所有类默认继承ArrayList"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:单继承 — 一个类只能有一个直接父类;接口可多继承接口。"
    }
  },
  {
    "id": 146,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，方法重写(Override)发生在（ ）",
    "options": [
      "A. 同一个类的方法之间",
      "B. 父子类之间",
      "C. 任意两个类之间",
      "D. 同一个包的不同类之间"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:重写的位置 — 发生在父子类之间,子类重新实现父类方法。"
    }
  },
  {
    "id": 147,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，所有类的基类(根类)是（ ）",
    "options": [
      "A. Object",
      "B. Class",
      "C. System",
      "D. String"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:Object — 所有类的根类,默认继承其方法如 toString/equals。"
    }
  },
  {
    "id": 148,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，关于super()的说法正确的是（ ）",
    "options": [
      "A. super()必须放在子类构造方法的第一行",
      "B. super()可以放在子类构造方法的任意位置",
      "C. super()只能在静态方法中使用",
      "D. super()可以不写，因为系统会自动添加"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:super() 位置 — 必须是子类构造方法第一行;不写时编译器默认补无参 super()。"
    }
  },
  {
    "id": 149,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`Animal a = new Dog(); // Dog extends Animal` `System.out.println(a instanceof Animal);`",
    "options": [
      "A. true",
      "B. false",
      "C. 编译错误",
      "D. 运行时错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:instanceof 与继承 — Dog extends Animal,Dog 对象 instanceof Animal 为 true。"
    }
  },
  {
    "id": 150,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，instanceof运算符的作用是（ ）",
    "options": [
      "A. 判断两个对象是否相等",
      "B. 判断对象是否属于某个类型",
      "C. 判断两个引用是否指向同一对象",
      "D. 判断对象是否已被销毁"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:instanceof 作用 — 判断对象是否属于某个类型(含父类/接口)。"
    }
  },
  {
    "id": 151,
    "type": "单选题",
    "points": 0.5,
    "question": "以下关于Java抽象类的说法，错误的是（ ）",
    "options": [
      "A. 抽象类用abstract关键字修饰",
      "B. 抽象类不能实例化",
      "C. 抽象类中必须有抽象方法",
      "D. 抽象类可以有构造方法"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:抽象类与抽象方法 — 抽象类可以没有抽象方法,但含抽象方法的类必须是抽象类(C 错误)。"
    }
  },
  {
    "id": 152,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码能否编译通过？（ ）`abstract class A { abstract void show(); }`",
    "options": [
      "A. 能",
      "B. 不能，抽象方法必须有方法体",
      "C. 不能，抽象类必须写abstract",
      "D. 能，但show()必须用public"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:抽象方法定义 — abstract 方法无方法体、以分号结尾,该写法能编译。"
    }
  },
  {
    "id": 153,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`abstract class Animal { abstract void sound(); }` `class Cat extends Animal { void sound() { System.out.println(\"喵\"); } }` `new Cat().sound();`",
    "options": [
      "A. 喵",
      "B. 无输出",
      "C. 编译错误",
      "D. 运行时错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:多态调用 — 子类 Cat 实现 sound(),调用输出 喵。"
    }
  },
  {
    "id": 154,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，用final修饰的方法（ ）",
    "options": [
      "A. 可以被重写",
      "B. 不能被重写",
      "C. 必须被重写",
      "D. 只能在抽象类中定义"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:final 方法 — 不能被子类重写,但可以正常继承使用。"
    }
  },
  {
    "id": 155,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码能否编译通过？（ ）`final int x = 10; x = 20;`",
    "options": [
      "A. 能",
      "B. 不能，final变量不允许重新赋值",
      "C. 不能，final变量必须初始化",
      "D. 能，x值变为20"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:final 变量 — 只能赋值一次,重新赋值编译错误。"
    }
  },
  {
    "id": 156,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，使用interface定义接口时，接口中的方法默认是（ ）",
    "options": [
      "A. public abstract",
      "B. private",
      "C. protected",
      "D. public final"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:接口方法默认修饰符 — public abstract;Java 8+ 才有 default/static。"
    }
  },
  {
    "id": 157,
    "type": "单选题",
    "points": 0.5,
    "question": "在Java中，一个类实现接口时使用的关键字是（ ）",
    "options": [
      "A. extends",
      "B. implements",
      "C. import",
      "D. package"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:implements — 类实现接口用 implements;extends 用于继承类/接口。"
    }
  },
  {
    "id": 158,
    "type": "单选题",
    "points": 0.5,
    "question": "以下关于接口中的default方法(Java 8+)，说法正确的是（ ）",
    "options": [
      "A. 子类必须重写default方法",
      "B. default方法可以有方法体",
      "C. default方法只能用private修饰",
      "D. default方法是静态的"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:default 方法 — Java 8 引入,接口中带方法体,实现类可选择重写。"
    }
  },
  {
    "id": 159,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`String s = \"Hello\"; System.out.println(s.charAt(1));`",
    "options": [
      "A. H",
      "B. e",
      "C. l",
      "D. o"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:charAt — 索引从 0 开始,charAt(1) 取第二个字符 e。"
    }
  },
  {
    "id": 160,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`String s1 = \"abc\"; String s2 = \"abc\"; System.out.println(s1 == s2);`",
    "options": [
      "A. true",
      "B. false",
      "C. 编译错误",
      "D. 运行时错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:字符串常量池 — 相同字面量指向池中同一对象,s1 == s2 为 true。"
    }
  },
  {
    "id": 161,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`String s = \"Hello\"; s = s + \" World\"; System.out.println(s);`",
    "options": [
      "A. Hello World",
      "B. Hello",
      "C. World",
      "D. 编译错误"
    ],
    "answer": "A",
    "analysis": {
      "brief": "考点:字符串不可变 — 拼接产生新对象,s 指向新串 Hello World。"
    }
  },
  {
    "id": 162,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`String s = \"HelloWorld\"; System.out.println(s.substring(5));`",
    "options": [
      "A. Hello",
      "B. World",
      "C. oWorld",
      "D. HelloWorld"
    ],
    "answer": "B",
    "analysis": {
      "brief": "考点:substring(n) — 从索引 n 截取到末尾,索引 5 起 → World。"
    }
  },
  {
    "id": 163,
    "type": "单选题",
    "points": 0.5,
    "question": "以下Java代码的输出结果是（ ）`String s = \"Java\"; System.out.println(s.toUpperCase());`",
    "options": [
      "A. Java",
      "B. java",
      "C. JAVA",
      "D. 编译错误"
    ],
    "answer": "C",
    "analysis": {
      "brief": "考点:toUpperCase — 转大写,Java → JAVA,原串不变返回新串。"
    }
  },
  {
    "id": 164,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些属于HTML块级元素？（ ）",
    "options": [
      "A. `<div>`",
      "B. `<span>`",
      "C. `<p>`",
      "D. `<h1>`"
    ],
    "answer": "ACD",
    "analysis": {
      "brief": "考点:块级 vs 行内 — div/p/h1 是块级;span 是典型行内元素。"
    }
  },
  {
    "id": 165,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于CSS选择器的说法，正确的有（ ）",
    "options": [
      "A. `.class`选中所有具有该class的元素",
      "B. `#id`选中具有该id的元素",
      "C. 元素选择器选中所有该标签元素",
      "D. 通配符`*`不选中任何元素"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:基础选择器 — 类/ID/元素选择器都成立;通配符 * 选中所有元素而非都不选。"
    }
  },
  {
    "id": 166,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是JavaScript中声明变量的方式？（ ）",
    "options": [
      "A. var",
      "B. let",
      "C. const",
      "D. int"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:JS 声明变量 — var/let/const 三种;int 是 Java 的,JS 没有。"
    }
  },
  {
    "id": 167,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于JavaScript数据类型的说法，正确的有（ ）",
    "options": [
      "A. `typeof null` 返回 `\"object\"`",
      "B. `typeof undefined` 返回 `\"undefined\"`",
      "C. 数组的类型是\"array\"",
      "D. NaN的类型是\"number\""
    ],
    "answer": "ABD",
    "analysis": {
      "brief": "考点:typeof 细节 — null→object、undefined→undefined、NaN→number 都对;数组 typeof 是 object 不是 array。"
    }
  },
  {
    "id": 168,
    "type": "多选题",
    "points": 0.58,
    "question": "在HTML中，以下哪些input type是用于按钮的？（ ）",
    "options": [
      "A. button",
      "B. submit",
      "C. reset",
      "D. checkbox"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:按钮类 input — button/submit/reset 都是按钮;checkbox 是复选框。"
    }
  },
  {
    "id": 169,
    "type": "多选题",
    "points": 0.58,
    "question": "在CSS中，以下哪些是有效的颜色表示方式？（ ）",
    "options": [
      "A. red",
      "B. `#FF0000`",
      "C. `rgb(255,0,0)`",
      "D. `color(red)`"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:CSS 颜色表示 — 关键字、十六进制 #FF0000、rgb() 均合法;没有 color() 函数。"
    }
  },
  {
    "id": 170,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java基本数据类型的说法，正确的有（ ）",
    "options": [
      "A. byte占1个字节",
      "B. int占4个字节",
      "C. long占8个字节",
      "D. char占4个字节"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:基本类型字节 — byte 1、int 4、long 8;char 占 2 字节不是 4。"
    }
  },
  {
    "id": 171,
    "type": "多选题",
    "points": 0.58,
    "question": "在Java中，以下哪些是合法的标识符？（ ）",
    "options": [
      "A. `_value`",
      "B. `$money`",
      "C. `count123`",
      "D. `123count`"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:合法标识符 — 可含 _、$、字母数字;数字开头(123count)非法。"
    }
  },
  {
    "id": 172,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是Java的循环结构？（ ）",
    "options": [
      "A. for",
      "B. while",
      "C. do-while",
      "D. if"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:循环结构 — for/while/do-while 三种;if 是分支不是循环。"
    }
  },
  {
    "id": 173,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是Java的访问修饰符？（ ）",
    "options": [
      "A. public",
      "B. private",
      "C. protected",
      "D. static"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:访问修饰符 — public/private/protected 三种;static 是非访问控制符。"
    }
  },
  {
    "id": 174,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java方法重载(Overload)的说法，正确的有（ ）",
    "options": [
      "A. 方法名必须相同",
      "B. 参数个数或类型必须不同",
      "C. 返回值类型可以不同",
      "D. 必须在同一个类中"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:重载条件 — 同名 + 参数列表不同;返回值可不同;在同一个类中。"
    }
  },
  {
    "id": 175,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是Java面向对象的特征？（ ）",
    "options": [
      "A. 封装",
      "B. 继承",
      "C. 多态",
      "D. 递归"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:OOP 特征 — 封装、继承、多态;递归是算法不是 OOP 特征。"
    }
  },
  {
    "id": 176,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些HTML标签常用于表单？（ ）",
    "options": [
      "A. `<input>`",
      "B. `<select>`",
      "C. `<textarea>`",
      "D. `<button>`"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:表单控件 — input/select/textarea/button 都是常用表单标签。"
    }
  },
  {
    "id": 177,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是Java中的引用类型？（ ）",
    "options": [
      "A. 数组",
      "B. String",
      "C. 类",
      "D. int"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:引用类型 — 数组、String、类都是;int 是基本数据类型。"
    }
  },
  {
    "id": 178,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于CSS盒模型的说法，正确的有（ ）",
    "options": [
      "A. content是内容区域",
      "B. padding是内边距",
      "C. border是边框",
      "D. margin是内边距"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:盒模型层次 — content → padding → border → margin;margin 是外边距不是内边距。"
    }
  },
  {
    "id": 179,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些关键字用于Java中的继承？（ ）",
    "options": [
      "A. extends",
      "B. implements",
      "C. super",
      "D. this"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:继承相关关键字 — extends 继承类、implements 实现接口、super 调用父类;this 与继承无关。"
    }
  },
  {
    "id": 180,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java数组的说法，正确的有（ ）",
    "options": [
      "A. 数组索引从0开始",
      "B. 数组的length是属性",
      "C. 数组一旦创建长度不可变",
      "D. 数组可以存储不同类型的数据"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:数组特性 — 索引从 0 开始、length 是属性、长度创建后固定;同一数组只能存同类型元素。"
    }
  },
  {
    "id": 181,
    "type": "多选题",
    "points": 0.58,
    "question": "在JavaScript中，以下哪些运算符用于比较？（ ）",
    "options": [
      "A. `==`",
      "B. `===`",
      "C. `!=`",
      "D. `!==`"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:比较运算符 — ==/===/!=/!== 都是 JS 比较运算符,注意 == 与 === 的转换差异。"
    }
  },
  {
    "id": 182,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java构造方法的说法，正确的有（ ）",
    "options": [
      "A. 方法名与类名相同",
      "B. 没有返回值类型",
      "C. 可以重载",
      "D. 可以被子类继承"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:构造方法 — 与类同名、无返回值类型、可重载;构造方法不被继承。"
    }
  },
  {
    "id": 183,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是CSS引入方式？（ ）",
    "options": [
      "A. 内联样式(style属性)",
      "B. 内部样式(`<style>`标签)",
      "C. 外部样式(`<link>`)",
      "D. 导入样式(@import)"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:CSS 引入方式 — 内联 style、内部 <style>、外部 <link>、@import 导入共四种。"
    }
  },
  {
    "id": 184,
    "type": "多选题",
    "points": 0.58,
    "question": "在Java中，以下哪些关键字用于异常处理？（ ）",
    "options": [
      "A. try",
      "B. catch",
      "C. finally",
      "D. throw"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:异常处理关键字 — try/catch/finally/throw(+ throws)。"
    }
  },
  {
    "id": 185,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java static关键字的说法，正确的有（ ）",
    "options": [
      "A. static变量属于类，所有对象共享",
      "B. static方法只能访问static成员",
      "C. static代码块在类加载时执行",
      "D. static可以修饰构造方法"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:static 三要点 — 变量类共享、方法只能直接访问静态成员、代码块类加载时执行;不能修饰构造方法。"
    }
  },
  {
    "id": 186,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是JavaScript的DOM操作选择方法？（ ）",
    "options": [
      "A. getElementById",
      "B. getElementsByClassName",
      "C. querySelectorAll",
      "D. getElementByTagName"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:DOM 方法名 — getElementById/getElementsByClassName/querySelectorAll;正确拼写是 getElementsByTagName(带 s)。"
    }
  },
  {
    "id": 187,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java中this关键字的说法，正确的有（ ）",
    "options": [
      "A. this代表当前对象的引用",
      "B. this可用于调用当前类的其他构造方法",
      "C. this可用于区分成员变量和局部变量",
      "D. this可以在静态方法中使用"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:this 用法 — 代表当前对象、this() 调用本类其他构造方法、区分成员与局部变量;静态方法中没有 this。"
    }
  },
  {
    "id": 188,
    "type": "多选题",
    "points": 0.58,
    "question": "在HTML中，以下哪些是`<table>`的子标签？（ ）",
    "options": [
      "A. `<tr>`",
      "B. `<td>`",
      "C. `<th>`",
      "D. `<thead>`"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:表格结构标签 — tr/td/th 以及 thead/tbody/tfoot 都用在 <table> 内。"
    }
  },
  {
    "id": 189,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于CSS定位(position)的说法，正确的有（ ）",
    "options": [
      "A. relative相对于自身原位置定位",
      "B. absolute相对于最近定位祖先定位",
      "C. fixed相对于视口定位",
      "D. static是默认定位方式"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:position 四种 — relative 相对自身原位、absolute 相对最近定位祖先、fixed 相对视口、static 默认。"
    }
  },
  {
    "id": 190,
    "type": "多选题",
    "points": 0.58,
    "question": "在Java中，以下哪些是合法的boolean值？（ ）",
    "options": [
      "A. true",
      "B. false",
      "C. TRUE",
      "D. FALSE"
    ],
    "answer": "AB",
    "analysis": {
      "brief": "考点:boolean 字面量 — 只有 true 和 false,严格小写;TRUE/FALSE 非法。"
    }
  },
  {
    "id": 191,
    "type": "多选题",
    "points": 0.58,
    "question": "以下关于Java中break和continue的说法，正确的有（ ）",
    "options": [
      "A. break可以结束循环",
      "B. continue可以跳过本次循环剩余语句",
      "C. break可用于switch语句",
      "D. continue可用于switch语句"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:break/continue 适用范围 — break 可用于循环和 switch;continue 只能用于循环,不能用于 switch。"
    }
  },
  {
    "id": 192,
    "type": "多选题",
    "points": 0.58,
    "question": "在HTML中，以下哪些是`<a>`标签的target属性值？（ ）",
    "options": [
      "A. `_self`",
      "B. `_blank`",
      "C. `_parent`",
      "D. `_top`"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:target 取值 — _self/_blank/_parent/_top 四个保留值均可。"
    }
  },
  {
    "id": 193,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是Java包装类？（ ）",
    "options": [
      "A. Integer",
      "B. Double",
      "C. Boolean",
      "D. int"
    ],
    "answer": "ABC",
    "analysis": {
      "brief": "考点:包装类 — 基本类型对应的引用类型如 Integer/Double/Boolean;int 本身是基本类型。"
    }
  },
  {
    "id": 194,
    "type": "多选题",
    "points": 0.58,
    "question": "在Java中，以下哪些是合法的赋值运算符？（ ）",
    "options": [
      "A. `+=`",
      "B. `-=`",
      "C. `*=`",
      "D. `/=`"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:复合赋值运算符 — +=、-=、*=、/= 都是合法的复合赋值。"
    }
  },
  {
    "id": 195,
    "type": "多选题",
    "points": 0.58,
    "question": "以下哪些是JavaScript中的falsy值？（ ）",
    "options": [
      "A. 0",
      "B. null",
      "C. undefined",
      "D. false"
    ],
    "answer": "ABCD",
    "analysis": {
      "brief": "考点:falsy 值 — 转布尔为 false 的值:0、null、undefined、false、\"\"、NaN。"
    }
  }
];
