export const ProductImage = ({ photo }) => (
    <Box sx={{ p: 5 }}>
        <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
            <Image key={product.photo} alt="large image" src={product.photo} ratio="1/1" />
        </Box>
    </Box>
);
