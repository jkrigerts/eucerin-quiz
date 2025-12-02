<script>
	let { children } = $props();
</script>

<div class="app-container">
	<header class="header">
		<img src="/eucerin-logo.svg" alt="Eucerin Logo" class="logo" />
	</header>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	:global(html, body) {
		overflow: hidden;
		height: 100%;
	}
	.app-container {
		min-height: 100vh;
		background: #ffffff;
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		font-family: "Montserrat", sans-serif;
		color: #0d233f; /* Close to Eucerin dark blue */
		overflow: hidden;
		height: 100vh;
	}

	.header {
		margin-bottom: 2rem;
	}

	.logo {
		height: 60px;
	}

	.content {
		width: 100%;
		max-width: 680px;
	}
</style>
