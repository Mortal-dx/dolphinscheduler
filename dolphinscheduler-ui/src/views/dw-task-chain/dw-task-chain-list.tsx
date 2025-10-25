/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { defineComponent, ref, onMounted, nextTick } from 'vue'
import styles from './index.module.scss'


const mockTaskData = {
  'ads_aud_rpt_material_diff_erpbom_costbom_dtl': {
    target: {
      id: 'ads_aud_rpt_material_diff_erpbom_costbom_dtl',
      name: '用户订单汇总表',
      table: 'ads_aud_rpt_material_diff_erpbom_costbom_dtl',
      duration: 180,
      status: 'success',
      startTime: '2024-01-15 02:30:00',
      endTime: '2024-01-15 02:33:00',
      level: 0,
      dependencies: [
        'dws_user_order_detail',
        'dws_payment_summary',
        'dws_user_behavior_analysis',
        'dws_product_sales_ranking',
        'dws_customer_value_segmentation'
      ]
    },
    dependenciesList: [
      // 第一层级
      {
        id: 'dws_user_order_detail',
        name: '用户订单明细表',
        table: 'dws_user_order_detail',
        duration: 240,
        status: 'success',
        startTime: '2024-01-15 02:00:00',
        endTime: '2024-01-15 02:04:00',
        level: 1,
        dependencies: [
          'dwd_order_detail',
          'dwd_user_detail',
          'dim_user_profile',
          'dim_product_category'
        ]
      },
      {
        id: 'dws_payment_summary',
        name: '支付汇总表',
        table: 'dws_payment_summary',
        duration: 300,
        status: 'success',
        startTime: '2024-01-15 01:45:00',
        endTime: '2024-01-15 01:50:00',
        level: 1,
        dependencies: [
          'dwd_payment_detail',
          'dim_payment_method',
          'dim_currency_exchange'
        ]
      },
      {
        id: 'dws_user_behavior_analysis',
        name: '用户行为分析表',
        table: 'dws_user_behavior_analysis',
        duration: 420,
        status: 'success',
        startTime: '2024-01-15 01:30:00',
        endTime: '2024-01-15 01:37:00',
        level: 1,
        dependencies: [
          'dwd_user_click_log',
          'dwd_user_browse_log',
          'dim_user_device_info'
        ]
      },
      {
        id: 'dws_product_sales_ranking',
        name: '产品销售排行表',
        table: 'dws_product_sales_ranking',
        duration: 360,
        status: 'success',
        startTime: '2024-01-15 01:15:00',
        endTime: '2024-01-15 01:21:00',
        level: 1,
        dependencies: [
          'dwd_product_info',
          'dim_product_brand',
          'dim_sales_region'
        ]
      },
      {
        id: 'dws_customer_value_segmentation',
        name: '客户价值分层表',
        table: 'dws_customer_value_segmentation',
        duration: 300,
        status: 'success',
        startTime: '2024-01-15 01:00:00',
        endTime: '2024-01-15 01:05:00',
        level: 1,
        dependencies: [
          'dwd_customer_info',
          'dim_customer_segment',
          'dim_membership_level'
        ]
      },
      // 第二层级
      {
        id: 'dwd_order_detail',
        name: '订单明细宽表',
        table: 'dwd_order_detail',
        duration: 420,
        status: 'success',
        startTime: '2024-01-15 01:00:00',
        endTime: '2024-01-15 01:07:00',
        level: 2,
        dependencies: [
          'ods_order',
          'ods_order_item',
          'ods_order_status_log'
        ]
      },
      {
        id: 'dwd_user_detail',
        name: '用户明细宽表',
        table: 'dwd_user_detail',
        duration: 300,
        status: 'success',
        startTime: '2024-01-15 00:30:00',
        endTime: '2024-01-15 00:35:00',
        level: 2,
        dependencies: [
          'ods_user',
          'ods_user_profile',
          'ods_user_address'
        ]
      },
      {
        id: 'dim_user_profile',
        name: '用户画像维度表',
        table: 'dim_user_profile',
        duration: 180,
        status: 'success',
        startTime: '2024-01-15 00:45:00',
        endTime: '2024-01-15 00:48:00',
        level: 2,
        dependencies: [
          'ods_user_tag',
          'ods_user_preference'
        ]
      },
      {
        id: 'dim_product_category',
        name: '产品分类维度表',
        table: 'dim_product_category',
        duration: 150,
        status: 'success',
        startTime: '2024-01-15 00:40:00',
        endTime: '2024-01-15 00:42:30',
        level: 2,
        dependencies: [
          'ods_category_hierarchy'
        ]
      },
      {
        id: 'dwd_payment_detail',
        name: '支付明细宽表',
        table: 'dwd_payment_detail',
        duration: 600,
        status: 'success',
        startTime: '2024-01-15 00:00:00',
        endTime: '2024-01-15 00:10:00',
        level: 2,
        dependencies: [
          'ods_payment',
          'ods_refund',
          'ods_settlement'
        ]
      },
      {
        id: 'dim_payment_method',
        name: '支付方式维度表',
        table: 'dim_payment_method',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:55:00',
        endTime: '2024-01-14 23:57:00',
        level: 2,
        dependencies: [
          'ods_payment_gateway'
        ]
      },
      {
        id: 'dim_currency_exchange',
        name: '货币汇率维度表',
        table: 'dim_currency_exchange',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:50:00',
        endTime: '2024-01-14 23:51:30',
        level: 2,
        dependencies: [
          'ods_exchange_rate'
        ]
      },
      {
        id: 'dwd_user_click_log',
        name: '用户点击日志表',
        table: 'dwd_user_click_log',
        duration: 360,
        status: 'success',
        startTime: '2024-01-15 00:20:00',
        endTime: '2024-01-15 00:26:00',
        level: 2,
        dependencies: [
          'ods_click_log',
          'ods_page_view'
        ]
      },
      {
        id: 'dwd_user_browse_log',
        name: '用户浏览日志表',
        table: 'dwd_user_browse_log',
        duration: 300,
        status: 'success',
        startTime: '2024-01-15 00:15:00',
        endTime: '2024-01-15 00:20:00',
        level: 2,
        dependencies: [
          'ods_aud_rpt_material_diff_erpbom_costbom_dtl',
          'ods_session_info'
        ]
      },
      {
        id: 'dim_user_device_info',
        name: '用户设备信息维度表',
        table: 'dim_user_device_info',
        duration: 150,
        status: 'success',
        startTime: '2024-01-15 00:10:00',
        endTime: '2024-01-15 00:12:30',
        level: 2,
        dependencies: [
          'ods_device_info'
        ]
      },
      {
        id: 'dwd_product_info',
        name: '产品信息宽表',
        table: 'dwd_product_info',
        duration: 240,
        status: 'success',
        startTime: '2024-01-15 00:05:00',
        endTime: '2024-01-15 00:09:00',
        level: 2,
        dependencies: [
          'ods_product',
          'ods_product_attribute'
        ]
      },
      {
        id: 'dim_product_brand',
        name: '产品品牌维度表',
        table: 'dim_product_brand',
        duration: 120,
        status: 'success',
        startTime: '2024-01-15 00:00:00',
        endTime: '2024-01-15 00:02:00',
        level: 2,
        dependencies: [
          'ods_brand_info'
        ]
      },
      {
        id: 'dim_sales_region',
        name: '销售区域维度表',
        table: 'dim_sales_region',
        duration: 150,
        status: 'success',
        startTime: '2024-01-14 23:58:00',
        endTime: '2024-01-15 00:00:30',
        level: 2,
        dependencies: [
          'ods_region_hierarchy'
        ]
      },
      {
        id: 'dwd_customer_info',
        name: '客户信息宽表',
        table: 'dwd_customer_info',
        duration: 300,
        status: 'success',
        startTime: '2024-01-14 23:45:00',
        endTime: '2024-01-14 23:50:00',
        level: 2,
        dependencies: [
          'ods_customer',
          'ods_customer_contact'
        ]
      },
      {
        id: 'dim_customer_segment',
        name: '客户分层维度表',
        table: 'dim_customer_segment',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:42:00',
        endTime: '2024-01-14 23:43:30',
        level: 2,
        dependencies: [
          'ods_segment_rule'
        ]
      },
      {
        id: 'dim_membership_level',
        name: '会员等级维度表',
        table: 'dim_membership_level',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:40:00',
        endTime: '2024-01-14 23:42:00',
        level: 2,
        dependencies: [
          'ods_membership_policy'
        ]
      },
 // 第三层级
      {
        id: 'ods_order',
        name: '订单原始表',
        table: 'ods_order',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:45:00',
        endTime: '2024-01-14 23:47:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_order_item',
        name: '订单项原始表',
        table: 'ods_order_item',
        duration: 150,
        status: 'success',
        startTime: '2024-01-14 23:42:00',
        endTime: '2024-01-14 23:44:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_order_status_log',
        name: '订单状态日志表',
        table: 'ods_order_status_log',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:40:00',
        endTime: '2024-01-14 23:41:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_user',
        name: '用户原始表',
        table: 'ods_user',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:40:00',
        endTime: '2024-01-14 23:41:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_user_profile',
        name: '用户档案原始表',
        table: 'ods_user_profile',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:38:00',
        endTime: '2024-01-14 23:40:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_user_address',
        name: '用户地址原始表',
        table: 'ods_user_address',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:36:00',
        endTime: '2024-01-14 23:37:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_user_tag',
        name: '用户标签原始表',
        table: 'ods_user_tag',
        duration: 60,
        status: 'success',
        startTime: '2024-01-14 23:35:00',
        endTime: '2024-01-14 23:36:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_user_preference',
        name: '用户偏好原始表',
        table: 'ods_user_preference',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:33:00',
        endTime: '2024-01-14 23:34:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_category_hierarchy',
        name: '分类层级原始表',
        table: 'ods_category_hierarchy',
        duration: 60,
        status: 'success',
        startTime: '2024-01-14 23:32:00',
        endTime: '2024-01-14 23:33:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_payment',
        name: '支付原始表',
        table: 'ods_payment',
        duration: 180,
        status: 'success',
        startTime: '2024-01-14 23:30:00',
        endTime: '2024-01-14 23:33:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_refund',
        name: '退款原始表',
        table: 'ods_refund',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:28:00',
        endTime: '2024-01-14 23:30:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_settlement',
        name: '结算原始表',
        table: 'ods_settlement',
        duration: 150,
        status: 'success',
        startTime: '2024-01-14 23:25:00',
        endTime: '2024-01-14 23:27:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_payment_gateway',
        name: '支付网关原始表',
        table: 'ods_payment_gateway',
        duration: 60,
        status: 'success',
        startTime: '2024-01-14 23:24:00',
        endTime: '2024-01-14 23:25:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_exchange_rate',
        name: '汇率原始表',
        table: 'ods_exchange_rate',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:22:00',
        endTime: '2024-01-14 23:23:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_click_log',
        name: '点击日志原始表',
        table: 'ods_click_log',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:20:00',
        endTime: '2024-01-14 23:22:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_page_view',
        name: '页面浏览原始表',
        table: 'ods_page_view',
        duration: 150,
        status: 'success',
        startTime: '2024-01-14 23:17:30',
        endTime: '2024-01-14 23:20:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_aud_rpt_material_diff_erpbom_costbom_dtl',
        name: '浏览日志原始表',
        table: 'ods_aud_rpt_material_diff_erpbom_costbom_dtl',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:15:00',
        endTime: '2024-01-14 23:17:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_session_info',
        name: '会话信息原始表',
        table: 'ods_session_info',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:13:30',
        endTime: '2024-01-14 23:15:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_device_info',
        name: '设备信息原始表',
        table: 'ods_device_info',
        duration: 60,
        status: 'success',
        startTime: '2024-01-14 23:12:30',
        endTime: '2024-01-14 23:13:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_product',
        name: '产品原始表',
        table: 'ods_product',
        duration: 180,
        status: 'success',
        startTime: '2024-01-14 23:10:00',
        endTime: '2024-01-14 23:13:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_product_attribute',
        name: '产品属性原始表',
        table: 'ods_product_attribute',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:08:00',
        endTime: '2024-01-14 23:10:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_brand_info',
        name: '品牌信息原始表',
        table: 'ods_brand_info',
        duration: 60,
        status: 'success',
        startTime: '2024-01-14 23:07:00',
        endTime: '2024-01-14 23:08:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_region_hierarchy',
        name: '区域层级原始表',
        table: 'ods_region_hierarchy',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 23:05:30',
        endTime: '2024-01-14 23:07:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_customer',
        name: '客户原始表',
        table: 'ods_customer',
        duration: 150,
        status: 'success',
        startTime: '2024-01-14 23:03:00',
        endTime: '2024-01-14 23:05:30',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_customer_contact',
        name: '客户联系原始表',
        table: 'ods_customer_contact',
        duration: 120,
        status: 'success',
        startTime: '2024-01-14 23:01:00',
        endTime: '2024-01-14 23:03:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_segment_rule',
        name: '分层规则原始表',
        table: 'ods_segment_rule',
        duration: 60,
        status: 'success',
        startTime: '2024-01-14 23:00:00',
        endTime: '2024-01-14 23:01:00',
        level: 3,
        dependencies: []
      },
      {
        id: 'ods_membership_policy',
        name: '会员政策原始表',
        table: 'ods_membership_policy',
        duration: 90,
        status: 'success',
        startTime: '2024-01-14 22:58:00',
        endTime: '2024-01-14 23:00:00',
        level: 3,
        dependencies: []
      }
    ]
  }
} as any
export default defineComponent({
  name: 'dw-task-chain-list',
  setup() {
    const targetTable = ref('ads_aud_rpt_material_diff_erpbom_costbom_dtl')
    const dateRange = ref('')
    const showResult = ref(false)
    const showEmpty = ref(true)
    const isError = ref(false)
    const emptyIcon = ref('[表情]')
    const emptyText = ref('请输入目标表名进行查询，查看任务执行耗时链路')

    // DOM ref
    const chartContainerRef = ref<HTMLDivElement>()
    const connectionSvgRef = ref<SVGSVGElement>()
    const nodesContainerRef = ref<HTMLDivElement>()

    // 工具函数
    const setDefaultDate = () => {
      const today = new Date()
      const yyyy = today.getFullYear()
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const dd = String(today.getDate()).padStart(2, '0')
      dateRange.value = `${yyyy}-${mm}-${dd}`
    }

    const showError = (msg: string) => {
      showResult.value = false
      showEmpty.value = true
      isError.value = true
      emptyIcon.value = '[表情]'
      emptyText.value = msg
    }

    const getTasksForTable = (tableName: string) => {
      const data = mockTaskData[tableName]
      if (!data) return []
      const allTasks = [data.target, ...data.dependenciesList]
      const taskMap: Record<string, any> = {}
      allTasks.forEach((t: any) => (taskMap[t.id] = t))
      allTasks.forEach((t: any) => {
        t.dependencyTasks = t.dependencies.map((d: string) => taskMap[d]).filter(Boolean)
      })
      return allTasks
    }

    // 布局计算 & 渲染（完全复用原逻辑）
    const calculateOptimalLayout = (tasks: any[]) => {
      const levelGroups: Record<number, any[]> = {}
      const nodePositions: Record<string, { x: number; y: number }> = {}
      const nodeSizes: Record<string, { width: number; height: number }> = {}

      tasks.forEach((task) => {
        const reversedLevel = Math.max(...tasks.map((t) => t.level)) - task.level
        if (!levelGroups[reversedLevel]) levelGroups[reversedLevel] = []
        levelGroups[reversedLevel].push(task)
      })

      tasks.forEach((task) => {
        const tempDiv = document.createElement('div')
        tempDiv.className = styles.taskNode
        tempDiv.style.visibility = 'hidden'
        tempDiv.style.position = 'absolute'
        tempDiv.innerHTML = `
          <div class="${styles.nodeHeader}">
            <div class="${styles.nodeName}">${task.table}</div>
            <div class="${styles.nodeDuration}">${task.duration}分钟</div>
          </div>
          <div class="${styles.nodeStartTime}">
            <span>startTime: ${task.startTime}</span>
            <span class="${styles.nodeStatus} ${styles['status-' + task.status]}">${task.status}</span>
          </div>
          <div class="${styles.nodeEndTime}">
            <div>endTime: ${task.endTime}</div>
          </div>
        `
        document.body.appendChild(tempDiv)
        nodeSizes[task.id] = { width: tempDiv.offsetWidth, height: tempDiv.offsetHeight }
        document.body.removeChild(tempDiv)
      })

      const levelWidth = 350
      const nodeHeight = 80
      const verticalSpacing = 40

      Object.keys(levelGroups)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .forEach((level) => {
          const nodes = levelGroups[parseInt(level)]
          const totalHeight = nodes.length * nodeHeight + (nodes.length - 1) * verticalSpacing
          const startY = Math.max(0, (4000 - totalHeight) / 2)
          nodes.forEach((node, index: number) => {
            const x = parseInt(level) * levelWidth + 100
            const y = startY + index * (nodeHeight + verticalSpacing)
            nodePositions[node.id] = { x, y }
          })
        })

      return { nodePositions, nodeSizes }
    }

    const drawConnection = (x1: number, y1: number, x2: number, y2: number) => {
      const svg = connectionSvgRef.value!
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const controlOffset = Math.abs(x2 - x1) * 0.5
      const d = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`
      path.setAttribute('d', d)
      path.setAttribute('class', styles.connectionLine)
      svg.appendChild(path)
    }

    const createNodeElement = (task: any) => {
      const nodeDiv = document.createElement('div')
      nodeDiv.className = styles.taskNode
      if (task.level === 0) nodeDiv.classList.add(styles.target)
      else if (task.level > 0) nodeDiv.classList.add(styles.upstream)
      nodeDiv.innerHTML = `
        <div class="${styles.nodeHeader}">
          <div class="${styles.nodeName}">${task.table}</div>
          <div class="${styles.nodeDuration}">${task.duration}分钟</div>
        </div>
        <div class="${styles.nodeStartTime}">
          <span>startTime: ${task.startTime}</span>
          <span class="${styles.nodeStatus} ${styles['status-' + task.status]}">${task.status}</span>
        </div>
        <div class="${styles.nodeEndTime}">
          <div>endTime: ${task.endTime}</div>
        </div>
      `
      return nodeDiv
    }

    const renderTasks = (tasks: any[]) => {
      const container = nodesContainerRef.value!
      const svg = connectionSvgRef.value!
      container.innerHTML = ''
      svg.innerHTML = ''
      const { nodePositions, nodeSizes } = calculateOptimalLayout(tasks)
      tasks.forEach((task) => {
        const pos = nodePositions[task.id]
        const size = nodeSizes[task.id]
        if (pos && size) {
          const nodeEl = createNodeElement(task)
          nodeEl.style.left = pos.x + 'px'
          nodeEl.style.top = pos.y + 'px'
          container.appendChild(nodeEl)
        }
      })
      tasks.forEach((task) => {
        if (task.dependencies && task.dependencies.length) {
          task.dependencies.forEach((depId: string) => {
            const fromPos = nodePositions[depId]
            const toPos = nodePositions[task.id]
            const fromSize = nodeSizes[depId]
            const toSize = nodeSizes[task.id]
            if (fromPos && toPos && fromSize && toSize) {
              drawConnection(
                fromPos.x + fromSize.width,
                fromPos.y + fromSize.height / 2,
                toPos.x,
                toPos.y + toSize.height / 2
              )
            }
          })
        }
      })
    }

    // 事件处理
    const handleSearch = async (e: Event) => {
      e.preventDefault()
      if (!targetTable.value.trim()) {
        showError('请输入目标表名')
        return
      }
      const taskData = mockTaskData[targetTable.value.trim()]
      if (!taskData) {
        showError(`未找到表 “${targetTable.value}” 的任务数据，请检查表名是否正确`)
        return
      }
      showResult.value = true
      showEmpty.value = false
      isError.value = false
      await nextTick()
      renderTasks(getTasksForTable(targetTable.value))
    }

    // 拖拽
    let isDragging = false
    let dragStartX = 0
    let dragStartY = 0
    let containerScrollLeft = 0
    let containerScrollTop = 0

    const bindDrag = () => {
      const el = chartContainerRef.value!
      el.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.target === el || e.target === nodesContainerRef.value || e.target === connectionSvgRef.value) {
          isDragging = true
          dragStartX = e.clientX
          dragStartY = e.clientY
          containerScrollLeft = el.scrollLeft
          containerScrollTop = el.scrollTop
          el.style.cursor = 'grabbing'
        }
      })
      document.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isDragging) return
        el.scrollLeft = containerScrollLeft - (e.clientX - dragStartX)
        el.scrollTop = containerScrollTop - (e.clientY - dragStartY)
      })
      document.addEventListener('mouseup', () => {
        isDragging = false
        el.style.cursor = 'grab'
      })
    }

    onMounted(() => {
      setDefaultDate()
      bindDrag()
    })
return () => (
      <div class={styles.container}>
        <div class={styles.searchSection}>
          <h1 class={styles.searchHeader}>数仓任务耗时链路分析</h1>
          <form class={styles.searchForm} onSubmit={handleSearch}>
            <div class={styles.formGroup}>
              <label>目标表名</label>
              <input v-model={targetTable.value} class={styles.formControl} placeholder="例如：ads_aud_rpt_material_diff_erpbom_costbom_dtl" />
            </div>
            <div class={styles.formGroup}>
              <label>执行日期</label>
              <input v-model={dateRange.value} type="date" class={styles.formControl} />
            </div>
            <button type="submit" class={styles.btnPrimary}>查询任务链路</button>
          </form>
        </div>

        {showResult.value && (
          <div class={styles.resultsSection}>
            <div class={styles.resultsHeader}>
              <div class={styles.resultsTitle}>{targetTable.value} - 任务执行链路分析</div>
              <div class={styles.resultsSubtitle}>执行日期：{dateRange.value} | 展示上游所有任务的耗时情况</div>
            </div>
            <div ref={chartContainerRef} class={styles.chartContainer}>
              <svg ref={connectionSvgRef} class={styles.chartSvg}></svg>
              <div ref={nodesContainerRef}></div>
            </div>
          </div>
        )}

        {showEmpty.value && (
          <div class={[styles.emptyState, isError.value && styles.errorState]}>
            <div class={styles.emptyIcon}>{emptyIcon.value}</div>
            <div>{emptyText.value}</div>
            {isError.value && (
              <div style="margin-top:10px;font-size:14px;color:#7f8c8d;">
                建议：请检查表名拼写是否正确，或尝试其他表名
              </div>
            )}
          </div>
        )}
      </div>
    )
    
  }
})
