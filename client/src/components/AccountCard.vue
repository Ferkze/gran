<template>
	<v-card>
		<v-card-title>
			<v-row no-gutters>
				<v-col cols="6">
					<span>{{ account.name }}</span>
				</v-col>
				<v-col cols="6" class="text-right">
					<span>
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" icon color="primary">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item
									v-for="(item, index) in menuItems"
									:key="index"
									@click="onAccountMenuClicked(account._id, item.action)"
								>
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</span>
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text>
			<p>
				Saldo <span class="font-weight-black float-right">{{ account.startingBalance | formatCurrency }}</span>
			</p>
			<p>
				Instituição
				<span v-if="account.institution" class="font-weight-black float-right">{{ account.institution.name }}</span>
				<span v-else-if="account.unregisteredInstitution" class="font-weight-black float-right">{{
					account.unregisteredInstitution
				}}</span>
				<span v-else class="font-weight-black float-right">Não registrado</span>
			</p>
			<p>Criado em {{ account.createdAt }}</p>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
	name: 'AccountCard'
})
export default class AccountCard extends Vue {
	@Prop({ required: true, type: Object })
	account!: Account

	menuItems = [{ title: 'Editar', action: 'edit' }]

	onAccountMenuClicked(accountId: string, action: string) {
		switch (action) {
			case 'edit':
				this.$router.push(`/contas/${accountId}`)
				break
		}
	}
}
</script>
