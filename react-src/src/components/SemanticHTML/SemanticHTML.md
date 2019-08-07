The component performs the following tasks:

<details>
	<summary>###Defines the prop types

</summary>
* The element name.

* The element class name.
Required to make it later styleable.

* The element title.
Usually a string, but it can be a link too.

* The element children.
Without children there is no use of this component.

* The element id.

</details>

<details>
	<summary>###Defines the default props

</summary>
</details>

<details>
	<summary>###Defines default props for Section

</summary>
</details>

<details>
	<summary>###Defines default props for Article

</summary>
</details>

<details>
	<summary>###Defines default props for Aside

</summary>
</details>

<details>
	<summary>###Defines default props for Nav

</summary>
</details>

<details>
	<summary>###Styles the semantic element title.

It is always hidden because it is needed only by the HTML outliner / validator.

</summary>
</details>

<details>
	<summary>###Creates a semantic HTML element with title.

Semantic elements with title are properly outlined in https://validator.w3.org/.
When a HTML document outlines perfectly it means its component structure is flawless.
Many times an invalid outline structure points to errors in component design and helps fix it.

Returns something like: `<section><h3>section title</h3>...children</section>` where the title is hidden by default

NOTE: since we have inside an element a title + content it will act as a list so we have to provide unique `key` props

</summary>
</details>

<details>
	<summary>###Creates a `<section>` element

</summary>
</details>

<details>
	<summary>###Creates an `<article>` element

</summary>
</details>

<details>
	<summary>###Creates an `<aside>` element

</summary>
</details>

<details>
	<summary>###Creates a `<nav>` element

</summary>
</details>

