

<script>

    import PaneUsersCard from './PaneUsersCard.svelte'
    import store from '../store/store.js'

    $: userList = Array.from($store.users.values())

</script>

<ul class='scrollable'>

    { #each userList as user }

        <li>
            <PaneUsersCard { user } contest={$store.contest}/>
        </li>

    { /each }

</ul>

<style>

    ul {
        height: 100%;
    }

    li {
        padding: 0.5em;
        border-bottom: 1px solid #ccc;
    }

</style>