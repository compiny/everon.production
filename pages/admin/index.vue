<template>
    <div class="applications-page">
        <div class="page-header">
            <h1>Управление заявками</h1>
            <div class="header-controls">
                <div class="filter-controls">
                    <select v-model="selectedSource" class="source-filter">
                        <option value="">Все источники</option>
                        <option v-for="source in sources" :key="source.id" :value="source.id">
                            {{ source.name }}
                        </option>
                    </select>
                </div>
                <div class="stat-item">Всего: {{ filteredLeads.length }} </div>
            </div>
        </div>

        <div class="applications-table">
            <div v-if="filteredLeads.length === 0" class="empty-state">
                {{ selectedSource ? 'Заявки по выбранному источнику не найдены' : 'Заявки не найдены' }}
            </div>

            <div v-else class="table-container">
                <table class="leads-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Источник</th>
                            <th>Сообщение</th>
                            <th>Дата создания</th>
                            <th>Товар</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="lead in filteredLeads" :key="lead.id" class="table-row" @click="goToLead(lead.id)"  style="cursor: pointer;">
                            <td>{{ lead.id || '-' }}</td>
                            <td>{{ lead.name || '-' }}</td>
                            <td>{{ lead.email || '-' }}</td>
                            <td>{{ lead.phone || '-' }}</td>
                            <td>{{ getSourceName(lead.sourceId) || '-' }}</td>
                            <td class="message-cell">{{ lead.message || '-' }}</td>
                            <td>{{ formatDate(lead.createdAt) }}</td>
                             <td class="product-names">
                                {{ getProductNames(lead) }}
                            </td>
                            <td @click.stop>
                                <button 
                                    @click="deleteLead(lead.id)" 
                                    class="delete-btn" 
                                    title="Удалить заявку"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Модальное окно для подтверждения удаления -->
        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal">
                <h3>Подтверждение удаления</h3>
                <p>Вы уверены, что хотите удалить эту заявку?</p>
                <div class="modal-actions">
                    <button @click="confirmDelete" class="btn-danger">Удалить</button>
                    <button @click="cancelDelete" class="btn-cancel">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'dashboard'
})

const { data: leads, refresh: refreshLeads } = await useFetch('/api/leads')
const { data: sourcesData } = await useFetch('/api/sources')

const showDeleteModal = ref(false)
const leadToDelete = ref(null)
const selectedSource = ref('')

const sources = computed(() => sourcesData.value?.sources || [])

// Фильтрация заявок по источнику
const filteredLeads = computed(() => {
    if (!leads.value?.leads) return []
    
    if (!selectedSource.value) {
        return leads.value.leads
    }
    
    return leads.value.leads.filter(lead => 
        lead.sourceId?.toString() === selectedSource.value.toString()
    )
})

// Получение названия источника по ID
const getSourceName = (sourceId) => {
    if (!sources.value.length || !sourceId) return '-'
    const source = sources.value.find(s => s.id === sourceId)
    return source ? source.name : '-'
}

// Удаление заявки
const deleteLead = (id) => {
    leadToDelete.value = id
    showDeleteModal.value = true
}

const confirmDelete = async () => {
    try {
        await $fetch(`/api/leads/${leadToDelete.value}`, {
            method: 'DELETE'
        })

        refreshLeads() 
        showDeleteModal.value = false
        leadToDelete.value = null
    } catch (error) {
        console.error('Error deleting lead:', error)
        alert('Ошибка при удалении заявки')
    }
}

const cancelDelete = () => {
    showDeleteModal.value = false
    leadToDelete.value = null
}

const formatDate = (dateString) => {
    return dateString.replace('T', ' ').replace('.000Z', '')
}

const goToLead = (leadId) => {
  navigateTo(`/admin/${leadId}`)
}

const getProductNames = (lead) => {
    if (lead.productNames && lead.productNames.length > 0) {
        return lead.productNames.filter(name => name).join(', ')
    }
    if (lead.productIds && lead.productIds.length > 0) {
        return lead.productIds.map(id => `#${id}`).join(', ')
    }
    return '-'
}
</script>

<style scoped>
.applications-page {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.page-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
}

.header-controls {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.stats {
    display: flex;
    gap: 20px;
}

.stat-item {
    padding: 8px 16px;
    background: #f3f4f6;
    border-radius: 8px;
    font-weight: 600;
}

.filter-controls {
    display: flex;
    gap: 15px;
    align-items: center;
}

.source-filter {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    font-size: 14px;
    min-width: 200px;
}

.source-filter:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.table-container {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.leads-table {
    width: 100%;
    border-collapse: collapse;
}

.leads-table th {
    background: #f8fafc;
    padding: 16px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
    font-size: 14px;
}

.leads-table td {
    padding: 16px;
    border-bottom: 1px solid #f3f4f6;
    color: #4b5563;
    font-size: 14px;
}

.table-row:hover {
    background: #f9fafb;
}

.message-cell {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.delete-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
}

.delete-btn:hover {
    background: #dc2626;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #6b7280;
    font-size: 18px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
}

/* Модальное окно */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal {
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
}

.modal h3 {
    margin: 0 0 15px 0;
    color: #1f2937;
}

.modal p {
    margin: 0 0 20px 0;
    color: #6b7280;
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.btn-danger {
    background: #ef4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-danger:hover {
    background: #dc2626;
}

.btn-cancel {
    background: #6b7280;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-cancel:hover {
    background: #4b5563;
}

</style>