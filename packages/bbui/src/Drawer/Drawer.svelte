<script>
  import Portal from "svelte-portal"
  import Button from "../Button/Button.svelte"
  import Body from "../Typography/Body.svelte"
  import Heading from "../Typography/Heading.svelte"

  export let title
  export let fillWidth

  let visible = false

  export function show() {
    if (visible) {
      return
    }
    visible = true
  }

  export function hide() {
    if (!visible) {
      return
    }
    visible = false
  }

  const easeInOutQuad = x => {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
  }

  // Use a custom svelte transition here because the built-in slide
  // transition has a horrible overshoot
  const slide = () => {
    return {
      duration: 360,
      css: t => {
        const translation = 100 - Math.round(easeInOutQuad(t) * 100)
        return `transform: translateY(${translation}%);`
      },
    }
  }
</script>

{#if visible}
  <Portal>
    <section class:fillWidth class="drawer" transition:slide|local>
      <header>
        <div class="text">
          <Heading size="XS">{title}</Heading>
          <Body size="S">
            <slot name="description" />
          </Body>
        </div>
        <div class="buttons">
          <Button secondary quiet on:click={hide}>Cancel</Button>
          <slot name="buttons" />
        </div>
      </header>
      <slot name="body" />
    </section>
  </Portal>
{/if}

<style>
  .buttons {
    display: flex;
    gap: var(--spacing-m);
  }

  .drawer {
    position: absolute;
    bottom: 0;
    left: 260px;
    width: calc(100% - 520px);
    background: var(--background);
    border-top: var(--border-light);
    z-index: 2;
  }

  .fillWidth {
    width: calc(100% - 260px) !important;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--border-light);
    padding: var(--spacing-l) var(--spacing-xl);
    gap: var(--spacing-xl);
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-m);
  }
</style>
