<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style>
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

body {
  line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

/* change colours to suit your needs */
ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

/* change colours to suit your needs */
mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* change border colour to suit your needs */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

#app {
  background-color: #1a2937;
  height: 100vh;
  font-family: "Noto Sans JP";
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin-bottom: 96px;
  background-color: black;
  color: white;
}
.header__logo {
  margin-left: 32px;
  font-weight: bold;
}
.header__nav {
  display: flex;
}
.header__list {
  margin-right: 32px;
  list-style: none;
  cursor: pointer;
}
.authentication__title {
  font-size: 56px;
  font-weight: bold;
  margin: 0 auto 56px;
  color: white;
  text-align: center;
}
.authentication__list {
  display: block;
  height: 64px;
  width: 480px;
  margin: 0 auto 24px;
  font-size: 24px;
  color: black;
}
button {
  height: 64px;
  width: 480px;
  margin: 64px auto 0px;
  display: block;
  font-size: 24px;
  background-color: black;
  padding: 0px;
  border-style: none;
  cursor: pointer;
  color: white;
}
.menu,
transition {
  display: none;
}
.br-sp{
  display: none;
}
span{
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .br-sp{
    display: inline-block;
  }
  .header__nav {
    display: none;
  }

  .authentication__list {
    width: 80%;
  }
  button {
    width: 80%;
  }

  .right-enter-active,
  .right-leave-active {
    transform: translate(0px, 0px);
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    list-style-type: none;
  }
  .right-enter,
  .right-leave-to {
    transform: translateX(100%) translateX(0px);
  }

  .menu__nav {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    background-color: white;
    text-align: center;
  }

  .menu__list {
    margin-top: 104px;
    font-size: 24px;
  }
  .menu {
    display: inline-block;
    width: 32px;
    height: 24px;
    cursor: pointer;
    position: relative;
    right: 20px;
    top: 2px;
  }
  .menu__line--top,
  .menu__line--middle,
  .menu__line--bottom {
    display: inline-block;
    width: 100%;
    height: 4px;
    background-color: white;
    position: absolute;
    transition: 0.5s;
  }
  .menu__line--top {
    top: 0;
  }
  .menu__line--middle {
    top: 10px;
  }
  .menu__line--bottom {
    bottom: 0;
  }
  .menu.is-active span:nth-of-type(1) {
    top: 10px;
    transform: rotate(45deg);
    background-color: black;
  }
  .menu.is-active span:nth-of-type(2) {
    opacity: 0;
  }
  .menu.is-active span:nth-of-type(3) {
    top: 10px;
    transform: rotate(-45deg);
    background-color: black;
  }
  .menu.is-active {
    z-index: 10;
  }
  span {
    cursor: pointer;
  }

}
</style>
