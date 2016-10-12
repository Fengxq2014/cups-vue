<template>
    <div>
    <LeftMenu></LeftMenu>
    <List></List>
    </div>
</template>

<script>
import LeftMenu from '../components/menu'
import List from './list'

export default {
  components: {
    LeftMenu,
    List
  }
}
</script>
