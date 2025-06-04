<template>
  <ControlLayout :menu-links>
    <ControlBody>
      <ControlFormInput name="name" placeholder="Enter name" label="Name" />

      <ControlFormDate name="name" placeholder="Enter date" label="Date" />

      <ControlFormSelect name="name" placeholder="Select name" label="Name" :options="[1, 2, 3]" />

      <ControlFormImage />

      <ControlFormCheck name="name" label="Name" />

      <ControlFormCheckMulti :options="['1', '2', '3']" />

      <ControlFormSwitch label="Enter Name" />

      <ControlCard />

      <ControlEmpty />

      <ControlTooltip />

      <ControlQuote />

      <ControlNav />
    </ControlBody>
  </ControlLayout>
</template>

<script setup>
const menuLinks = [
  {
    name: 'Homepage',
    link: '/'
  },
  {
    name: 'Blog',
    divide: true
  },
  {
    name: 'Posts',
    link: '/'
  },
  {
    name: 'Categories',
    link: '/'
  },
  {
    name: 'Authors',
    link: '/'
  }
];
</script>
