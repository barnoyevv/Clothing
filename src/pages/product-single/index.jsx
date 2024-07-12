import { Card, CardContent, Typography, CircularProgress, Grid, CardMedia, Divider, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';
import { product } from "@service";
import { Tag } from "antd";
import {UploadFileModal} from "@modal"

const SinglePage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [open, setOpen] = useState(false);
  const [prodId, setprodId] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await product.get_product(id);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!products) {
    return (
      <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  const handleEdit = () => {
    console.log("Edit action");
  };

  const deleteItem = async (product_id) => {
    try {
      const response = await product.delete(product_id);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/main/products")
        }, 500);
        Notification({ title: "Product deleted", type: 'success' });
      }
    } catch (error) {
      Notification({ title: "Error", type: 'error' });
    }
  };

  const uploadFile = (product_id) => {
    setprodId(product_id)
    setOpen(true)
  }

  return (
    <>
      <UploadFileModal data={prodId} open={open} handleClose={() => setOpen(false)} />
      <Grid container spacing={2} justifyContent="center" style={{ padding: '20px' }}>
        <Grid item xs={12} md={10}>
          <Card style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {products.image_url && (
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-indicators">
                        {products.image_url.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        {products.image_url.map((url, index) => (
                          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <CardMedia
                              component="img"
                              height="auto"
                              image={url}
                              alt={`Product Image ${index + 1}`}
                              style={{ borderRadius: '10px', marginBottom: '10px' }}
                            />
                          </div>
                        ))}
                      </div>
                      <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon custom-carousel-control-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon custom-carousel-control-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" component="div" gutterBottom style={{ color: '#3f51b5' }}>
                    {products.product_name}
                  </Typography>
                  <Divider style={{ marginBottom: '10px' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Description:</strong> {products.description}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Made In:</strong> {products.made_in}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Color:</strong> {products.color.join(", ")}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Size:</strong> {products.size.join(", ")}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Count:</strong> {products.count}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Cost:</strong> ${products.cost}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Discount:</strong> {products.discount}%
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>Age Range:</strong> {products.age_min} - {products.age_max} years
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                    <strong>For Gender:</strong> {products.for_gender}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Tag color="blue" style={{ margin: '10px 0' }}>
                    {products.category}
                  </Tag>
                  <Divider style={{ margin: '10px 0' }} />
                  <div className='flex justify-center'>
                    <IconButton aria-label="delete" onClick={() => deleteItem(products.product_id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="addPhoto" onClick={() => uploadFile(products.product_id)}>
                      <AddPhotoAlternateIcon />
                    </IconButton>
                    <IconButton aria-label="view" onClick={() => moveSingle(products.product_id)}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SinglePage;
