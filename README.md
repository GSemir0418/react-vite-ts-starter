pnpm create vite 

pnpm i sass

reset.scss

```
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
*::before, *::after {
    box-sizing: border-box;
}

a {
    color:inherit;
    text-decoration: none;
}

h1, h2, h3, h4, h5 {
    font-weight: normal;
}

button, input {
    font:inherit;
}
```

pnpm add react-router-dom