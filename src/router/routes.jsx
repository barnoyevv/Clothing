import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import EngineeringIcon from '@mui/icons-material/Engineering';

const routes = [
	{
		path: "/main",
		content: "Category",
		icon: <CategoryIcon/>
	},
	{
		path: "/main/products",
		content: "Products",
		icon: <ProductionQuantityLimitsIcon/>
	},
	{
		path: "/main/workers",
		content: "Workers",
		icon: <EngineeringIcon/>
	},
];

export default routes;