<template>
  <div class="currency">
    
    <ul class="currency__nav">
      <li
        class="currency__list"
        v-for="(branddata, index) in branddatas"
        :key="index"
      >
        <span
          @click="
            $router.push({
              name: 'Price',
              params: {
                itemId: branddata.itemId,
                name: branddata.name,
                namejp: branddata.namejp,
              },
            })
          "
          >{{ branddata.name }} {{ branddata.namejp }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      branddatas: [
        { itemId: 0, name: "BTC", namejp: "ビットコイン" },
        { itemId: 1, name: "ETH", namejp: "イーサリアム" },
        { itemId: 2, name: "BCH", namejp: "ビットコインキャッシュ" },
        { itemId: 3, name: "LTC", namejp: "ライトコイン" },
        { itemId: 4, name: "XRP", namejp: "リップル" },
      ],
    };
  },
};
</script>

<style scoped>
.currency__list {
  font-size: 32px;
  text-align: center;
  margin-bottom: 80px;
  color: #f58125;
}
.currency__list span {
  display: inline-block;
  cursor: pointer;
}
</style>
