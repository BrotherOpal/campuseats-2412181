# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
= Building a UI imperatively is telling the browser step by step how to create and update anything in the website. Building UI imperatively mean we creates many components that we describe what we want to change, then React will do the updates for us.

2. Why must a component name start with a capital letter?
= To differentiate if the component is HTML elements like <div> or our own custom component like
<Profile />. If someone write <profile />, React will mistaken it for HTML elements.

3. What does a fragment <>...</> do, and why not just use a <div>?
= Fragments allow developer to group many elements together, and we dont need to add any extra elements. This keeps the HTML structures clean. <div> is better use for other works like changing background colour.

4. Name one benefit of splitting the UI into small components.
= Easier to manage like a lego. We can change any components we want with another components or just remove it entirely without changing everything.