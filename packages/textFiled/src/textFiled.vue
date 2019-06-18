<template lang="html">
  <div class="textField">
    <template v-if="type==='single'">
      <el-form>
        <el-form-item
          v-for="(item, i) in textField"
          :label="item.label"
          :key="item.key">
          <el-input v-model="item.value"></el-input>
          <i v-if="(i + textField.length)!==1" class="el-icon-remove-outline" @click="deletedItem(item)"></i>
          <i v-if="i === textField.length-1" class="el-icon-circle-plus-outline" @click="addItem(item)"></i>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="type==='multiple'">
      <el-form
        v-for="(field, i) in textField"
        inline
        :key="i">
        <el-form-item
          v-for="(item, j) in field"
          :label="item.label"
          :key="item.key">
          <el-input v-model="item.value"></el-input>
        </el-form-item>

        <i v-if="(i + textField.length)!==1" class="el-icon-remove-outline" @click="deletedItem(field)"></i>
        <i v-if="i === textField.length-1" class="el-icon-circle-plus-outline" @click="addItem(field)"></i>
      </el-form>
    </template>

  </div>
</template>

<script>
import ElInput from 'element-ui/packages/input'
import ElFormItem from 'element-ui/packages/form-item'
import ElForm from 'element-ui/packages/form'
export default {
  name: 'textField',
  model: {
    prop: 'domains',
    event: 'change'
  },
  props: {
    domains: {
      type: Array,
      required: true
    },
    type: {
      validator: value => {
        return ['single', 'multiple'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      textField: JSON.parse(JSON.stringify(this.domains))
    }
  },
  components: {
    ElFormItem,
    ElInput,
    ElForm
  },
  computed: {

  },
  methods: {
    deletedItem(item) {
      var index = this.textField.indexOf(item)
      if (index !== -1) {
        this.textField.splice(index, 1)
      }
      this.$emit('change', this.textField)
    },
    newItem() {
      let newItem
      if (this.type==='single') {
        newItem = {
          value: '',
          label: this.domains[0].label,
          key: Date.now()
        }
      } else {
        newItem = this.domains[0].map((i,k) => {
          return {
            value: '',
            label: i.label,
            key: k + Date.now()
          }
        })
      }
      return newItem
    },
    addItem(item) {
      this.textField.push(this.newItem())
      this.$emit('change', this.textField)
    }
  }
}
</script>

<style lang="css">
</style>
