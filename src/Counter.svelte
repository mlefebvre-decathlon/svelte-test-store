<script>
  import { count } from './count.store';

  export let steps = [1, 5];

  const incrementReducer = (step = 1) => state => state + step;

  const onClick = (store, reducer) => () => {
    store.update(reducer);
  };

  const makeSteps = steps => [...steps].reverse().map(step => -step).concat(steps);

  $: counterSteps = makeSteps(steps);
</script>

<style>
    .count-label {
        color: #ff3e00;
    }

    .count-value {
        color: #111cff;
    }

    .count-label, .count-value {
        text-transform: uppercase;
        font-size: 3em;
        font-weight: 100;
    }

    button {
        font-size: 1.5em;
        padding: .5em 1.5em;
    }

    button + button {
        margin-left: 1em;
    }
</style>

<div>
    <p>
        <span class="count-label">Count: </span>
        <span
                class="count-value"
                data-testid="count-value"
        >{ $count }</span>
    </p>
    <p>
        {#each counterSteps as step}
            <button
                    data-testid={`counter-increment-${step}`}
                    on:click={onClick(count, incrementReducer(step))}
            > { step }
            </button>
        {/each}
    </p>
</div>
