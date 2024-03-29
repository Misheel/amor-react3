import React, { useEffect, useState } from 'react';
import Header from '../Header'
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

function SinglePost({ match }) {

    const [post, setPost] = useState();

    const id = match.params.id;

    useEffect(() => {
        fetch('/api/post/read/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (post) {
                setPost(post);
                document.title = post.name;
            });
    }, [id])


    function createMarkup() {
        return { __html: post.content };
    }

    return (
        <React.Fragment>
            <Header />


            <section class="breadcrumb breadcrumb_bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb_iner">
                                <div class="breadcrumb_iner_item text-center">
                                    <h2>blog details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="blog_area single-post-area section_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 posts-list">
                            <div class="single-post">
                                <div class="feature-img">
                                    <img class="img-fluid" src="img/blog/single_blog_1.png" alt="" />
                                </div>
                                {
                                    post &&
                                    <div class="blog_details">
                                        <h2>{post.name}</h2>
                                        <ul class="blog-info-link mt-3 mb-4">
                                            <li><a href="#"><i class="far fa-user"></i> Travel, Lifestyle</a></li>
                                            <li><a href="#"><i class="far fa-comments"></i> 03 Comments</a></li>
                                        </ul>
                                        <div dangerouslySetInnerHTML={createMarkup()}></div>
                                    </div>
                                }
                            </div>
                            <div class="navigation-top">
                                <div class="d-sm-flex justify-content-between text-center">
                                    <p class="like-info"><span class="align-middle"><i class="far fa-heart"></i></span> Lily and 4
                        people like this</p>
                                    <div class="col-sm-4 text-center my-2 my-sm-0">

                                    </div>
                                    <ul class="social-icons">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-dribbble"></i></a></li>
                                        <li><a href="#"><i class="fab fa-behance"></i></a></li>
                                    </ul>
                                </div>
                                <div class="navigation-area">
                                    <div class="row">
                                        <div
                                            class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                            <div class="thumb">
                                                <a href="#">
                                                    <img class="img-fluid" src="img/post/preview.png" alt="" />
                                                </a>
                                            </div>
                                            <div class="arrow">
                                                <a href="#">
                                                    <span class="lnr text-white ti-arrow-left"></span>
                                                </a>
                                            </div>
                                            <div class="detials">
                                                <p>Prev Post</p>
                                                <a href="#">
                                                    <h4>Space The Final Frontier</h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div
                                            class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                            <div class="detials">
                                                <p>Next Post</p>
                                                <a href="#">
                                                    <h4>Telescopes 101</h4>
                                                </a>
                                            </div>
                                            <div class="arrow">
                                                <a href="#">
                                                    <span class="lnr text-white ti-arrow-right"></span>
                                                </a>
                                            </div>
                                            <div class="thumb">
                                                <a href="#">
                                                    <img class="img-fluid" src="img/post/next.png" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="blog-author">
                                <div class="media align-items-center">
                                    <img src="img/blog/author.png" alt="" />
                                    <div class="media-body">
                                        <a href="#">
                                            <h4>Harvard milan</h4>
                                        </a>
                                        <p>Second divided from form fish beast made. Every of seas all gathered use saying you're, he
                           our dominion twon Second divided from</p>
                                    </div>
                                </div>
                            </div>
                            
                            <CommentList postId={id} />                            
                            
                        </div>
                        <div class="col-lg-4">
                            <div class="blog_right_sidebar">
                                <aside class="single_sidebar_widget search_widget">
                                    <form action="#">
                                        <div class="form-group">
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder='Search Keyword'
                                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Search Keyword'" />
                                                <div class="input-group-append">
                                                    <button class="btn" type="button"><i class="ti-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="button rounded-0 primary-bg text-white w-100 btn_1" type="submit">Search</button>
                                    </form>
                                </aside>
                                <aside class="single_sidebar_widget post_category_widget">
                                    <h4 class="widget_title">Category</h4>
                                    <ul class="list cat-list">
                                        <li>
                                            <a href="#" class="d-flex">
                                                <p>Resaurant food</p>
                                                <p>(37)</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-flex">
                                                <p>Travel news</p>
                                                <p>(10)</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-flex">
                                                <p>Modern technology</p>
                                                <p>(03)</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-flex">
                                                <p>Product</p>
                                                <p>(11)</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-flex">
                                                <p>Inspiration</p>
                                                <p>(21)</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="d-flex">
                                                <p>Health Care</p>
                                                <p>(21)</p>
                                            </a>
                                        </li>
                                    </ul>
                                </aside>
                                <aside class="single_sidebar_widget popular_post_widget">
                                    <h3 class="widget_title">Recent Post</h3>
                                    <div class="media post_item">
                                        <img src="img/post/post_1.png" alt="post" />
                                        <div class="media-body">
                                            <a href="single-blog.html">
                                                <h3>From life was you fish...</h3>
                                            </a>
                                            <p>January 12, 2019</p>
                                        </div>
                                    </div>
                                    <div class="media post_item">
                                        <img src="img/post/post_2.png" alt="post" />
                                        <div class="media-body">
                                            <a href="single-blog.html">
                                                <h3>The Amazing Hubble</h3>
                                            </a>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>
                                    <div class="media post_item">
                                        <img src="img/post/post_3.png" alt="post" />
                                        <div class="media-body">
                                            <a href="single-blog.html">
                                                <h3>Astronomy Or Astrology</h3>
                                            </a>
                                            <p>03 Hours ago</p>
                                        </div>
                                    </div>
                                    <div class="media post_item">
                                        <img src="img/post/post_4.png" alt="post" />
                                        <div class="media-body">
                                            <a href="single-blog.html">
                                                <h3>Asteroids telescope</h3>
                                            </a>
                                            <p>01 Hours ago</p>
                                        </div>
                                    </div>
                                </aside>
                                <aside class="single_sidebar_widget tag_cloud_widget">
                                    <h4 class="widget_title">Tag Clouds</h4>
                                    <ul class="list">
                                        <li>
                                            <a href="#">project</a>
                                        </li>
                                        <li>
                                            <a href="#">love</a>
                                        </li>
                                        <li>
                                            <a href="#">technology</a>
                                        </li>
                                        <li>
                                            <a href="#">travel</a>
                                        </li>
                                        <li>
                                            <a href="#">restaurant</a>
                                        </li>
                                        <li>
                                            <a href="#">life style</a>
                                        </li>
                                        <li>
                                            <a href="#">design</a>
                                        </li>
                                        <li>
                                            <a href="#">illustration</a>
                                        </li>
                                    </ul>
                                </aside>
                                <aside class="single_sidebar_widget instagram_feeds">
                                    <h4 class="widget_title">Instagram Feeds</h4>
                                    <ul class="instagram_row flex-wrap">
                                        <li>
                                            <a href="#">
                                                <img class="img-fluid" src="img/post/post_5.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img class="img-fluid" src="img/post/post_6.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img class="img-fluid" src="img/post/post_7.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img class="img-fluid" src="img/post/post_8.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img class="img-fluid" src="img/post/post_9.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img class="img-fluid" src="img/post/post_10.png" alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </aside>
                                <aside class="single_sidebar_widget newsletter_widget">
                                    <h4 class="widget_title">Newsletter</h4>
                                    <form action="#">
                                        <div class="form-group">
                                            <input type="email" class="form-control" onfocus="this.placeholder = ''"
                                                onblur="this.placeholder = 'Enter email'" placeholder='Enter email' required />
                                        </div>
                                        <button class="button rounded-0 primary-bg text-white w-100 btn_1"
                                            type="submit">Subscribe</button>
                                    </form>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </React.Fragment>
    );
}

export default SinglePost;
